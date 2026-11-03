"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const COLORS = {
  background: 0x140c0d,
  skin: 0xc99a72,
  hair: 0x0d0a0a,
  sweater: 0xc9c8c6,
  sweaterDark: 0x8f8e8c,
  jeans: 0x3f6da3,
  shoe: 0xf1ece6,
  frame: 0x0b0b0c,
  headphone: 0xf6f4f1,
};

function capsule(radius: number, length: number, material: THREE.Material) {
  return new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 10, 24), material);
}

function buildTunnel() {
  const geometry = new THREE.CylinderGeometry(9, 9, 60, 4, 60, true);
  geometry.rotateX(Math.PI / 2);
  geometry.rotateZ(Math.PI / 4);
  const uniforms = {
    uTime: { value: 0 },
    uDark: { value: new THREE.Color(0x1d0b0f) },
    uLight: { value: new THREE.Color(0x7a1426) },
    uFade: { value: new THREE.Color(COLORS.background) },
  };
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      varying float vDepth;
      void main() {
        vUv = uv;
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        vDepth = -view.z;
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uDark;
      uniform vec3 uLight;
      uniform vec3 uFade;
      varying vec2 vUv;
      varying float vDepth;
      void main() {
        float wave = 0.5 * sin(vUv.y * 40.0 + uTime * 0.5);
        float u = floor(vUv.x * 32.0 + wave);
        float v = floor(vUv.y * 44.0 + uTime * 0.25);
        float check = mod(u + v, 2.0);
        vec3 color = mix(uDark, uLight, check);
        float fade = smoothstep(5.0, 34.0, vDepth);
        gl_FragColor = vec4(mix(color, uFade, fade), 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -14;
  mesh.scale.set(1.25, 0.72, 1);
  return { mesh, uniforms };
}

// Round lens outline that sweeps up to a point at the top outer edge.
function glassesFrame(side: 1 | -1, material: THREE.Material) {
  const radius = 0.205;
  const shape = new THREE.Shape();
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const distance = angle - 0.8;
    const wrapped = Math.atan2(Math.sin(distance), Math.cos(distance));
    const r = radius * (1 + 0.6 * Math.exp(-((wrapped / 0.24) ** 2)));
    const x = Math.cos(angle) * r * side;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, radius * 0.8, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false, curveSegments: 32 }), material);
}

function buildCharacter() {
  const root = new THREE.Group();
  const standard = (color: number, roughness = 0.65) => new THREE.MeshStandardMaterial({ color, roughness });
  const skin = standard(COLORS.skin, 0.55);
  const hair = standard(COLORS.hair, 0.6);
  const sweater = standard(COLORS.sweater, 0.85);
  const sweaterDark = standard(COLORS.sweaterDark, 0.8);
  const jeans = standard(COLORS.jeans, 0.8);
  const shoe = standard(COLORS.shoe, 0.5);
  const frame = standard(COLORS.frame, 0.3);
  const headphone = standard(COLORS.headphone, 0.35);

  for (const side of [-1, 1]) {
    const leg = capsule(0.17, 1.02, jeans);
    leg.position.set(side * 0.21, 0.77, 0);
    root.add(leg);
    const sneaker = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), shoe);
    sneaker.scale.set(1, 0.55, 1.6);
    sneaker.position.set(side * 0.22, 0.11, 0.09);
    root.add(sneaker);
  }

  const hips = new THREE.Mesh(new THREE.SphereGeometry(0.38, 28, 20), jeans);
  hips.scale.set(1, 0.8, 0.7);
  hips.position.y = 1.36;
  root.add(hips);

  const torsoProfile = [
    [0, 1.3],
    [0.39, 1.3],
    [0.41, 1.36],
    [0.39, 1.65],
    [0.43, 2.0],
    [0.44, 2.2],
    [0.36, 2.33],
    [0.18, 2.4],
    [0, 2.4],
  ].map(([radius, y]) => new THREE.Vector2(radius, y));
  const torso = new THREE.Mesh(
    new THREE.LatheGeometry(new THREE.SplineCurve(torsoProfile).getPoints(40), 40),
    sweater,
  );
  torso.scale.z = 0.68;
  root.add(torso);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.17, 32, 1, true), sweater);
  collar.material.side = THREE.DoubleSide;
  collar.position.set(0, 2.38, 0);
  root.add(collar);
  const zip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.42, 0.015), sweaterDark);
  zip.position.set(0, 2.17, 0.265);
  zip.rotation.x = 0.14;
  root.add(zip);
  const zipPull = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.07, 0.02), frame);
  zipPull.position.set(0, 2.34, 0.255);
  root.add(zipPull);

  const arms: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.47, 2.2, 0);
    arm.rotation.z = side * 0.13;
    const sleeve = capsule(0.125, 0.86, sweater);
    sleeve.position.y = -0.5;
    arm.add(sleeve);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.115, 20, 16), skin);
    hand.position.y = -1.08;
    arm.add(hand);
    root.add(arm);
    arms.push(arm);
  }

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.24, 24), skin);
  neck.position.y = 2.44;
  root.add(neck);

  const head = new THREE.Group();
  head.position.y = 2.5;
  root.add(head);
  const face = new THREE.Group();
  face.position.y = 0.5;
  head.add(face);

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.56, 40, 32), skin);
  skull.scale.set(0.96, 1.04, 0.94);
  face.add(skull);

  // Hair: top cap, long back sheet, and two straight front sections.
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.595, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.46), hair);
  cap.scale.set(0.98, 1.05, 0.98);
  cap.rotation.x = -0.34;
  cap.position.y = 0.01;
  face.add(cap);
  const backHair = capsule(0.52, 1.25, hair);
  backHair.scale.set(1.03, 1, 0.34);
  backHair.position.set(0, -0.62, -0.32);
  face.add(backHair);
  for (const side of [-1, 1]) {
    const lock = capsule(0.2, 1.0, hair);
    lock.scale.set(1, 1, 0.3);
    lock.position.set(side * 0.43, -0.6, 0.2);
    lock.rotation.z = side * 0.02;
    face.add(lock);
    const sideHair = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 16), hair);
    sideHair.scale.set(0.8, 2, 1.3);
    sideHair.position.set(side * 0.5, 0.1, 0.13);
    face.add(sideHair);
  }
  const part = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.42), standard(0x2a2222));
  part.position.set(0, 0.615, 0.04);
  part.rotation.x = 0.28;
  face.add(part);

  const pupils: THREE.Mesh[] = [];
  const eyeWhite = standard(0xf8f4ef, 0.3);
  const pupilMaterial = standard(0x17100e, 0.2);
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 16), eyeWhite);
    eye.scale.set(1, 1.08, 0.5);
    eye.position.set(side * 0.215, 0.03, 0.475);
    face.add(eye);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 12), pupilMaterial);
    pupil.scale.z = 0.4;
    pupil.position.set(side * 0.215, 0.03, 0.51);
    face.add(pupil);
    pupils.push(pupil);
    const brow = capsule(0.013, 0.13, hair);
    brow.rotation.z = Math.PI / 2 - side * 0.14;
    brow.position.set(side * 0.215, 0.31, 0.49);
    face.add(brow);
  }

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), skin);
  nose.scale.set(0.9, 0.9, 1.1);
  nose.position.set(0, -0.09, 0.535);
  face.add(nose);

  const smileCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.12, -0.235, 0.49),
    new THREE.Vector3(0, -0.325, 0.535),
    new THREE.Vector3(0.12, -0.235, 0.49),
  );
  face.add(new THREE.Mesh(new THREE.TubeGeometry(smileCurve, 16, 0.012, 8), standard(0x5b2622)));

  // Glasses sit in front of the eyes, with pointed upper outer corners.
  const glasses = new THREE.Group();
  glasses.position.set(0, 0.04, 0.53);
  face.add(glasses);
  for (const side of [-1, 1] as const) {
    const lens = glassesFrame(side, frame);
    lens.position.x = side * 0.225;
    lens.rotation.y = side * 0.12;
    glasses.add(lens);
    const temple = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.03, 0.55), frame);
    temple.position.set(side * 0.5, 0.06, -0.3);
    glasses.add(temple);
  }
  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.09, 12), frame);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.03, 0.03);
  glasses.add(bridge);

  // Headphones sit over the hair.
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.625, 0.038, 16, 64, Math.PI), headphone);
  band.scale.y = 1.06;
  band.position.y = 0.02;
  band.rotation.x = -0.1;
  face.add(band);
  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 32), headphone);
    cup.rotation.z = Math.PI / 2;
    cup.scale.set(1.15, 1, 1);
    cup.position.set(side * 0.6, 0, 0.03);
    face.add(cup);
    const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.125, 0.04, 12, 28), standard(0xdedad5));
    cushion.rotation.y = Math.PI / 2;
    cushion.position.set(side * 0.545, 0, 0.03);
    face.add(cushion);
  }

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.85, 40),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45 }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.y = 0.5;
  shadow.position.y = 0.005;
  root.add(shadow);

  return { root, head, pupils, arms };
}

export default function AvatarScene() {
  const stage = useRef<HTMLDivElement>(null);
  const controls = useRef({ paused: false, reset: () => {} });
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = stage.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.background);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80);

    scene.add(new THREE.HemisphereLight(0xfff0e8, 0x35141a, 1.5));
    const key = new THREE.DirectionalLight(0xfff3ea, 2.4);
    key.position.set(-2, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff4a5a, 2);
    rim.position.set(4, 2, -3);
    scene.add(rim);

    const tunnel = buildTunnel();
    scene.add(tunnel.mesh);
    const { root, head, pupils, arms } = buildCharacter();
    scene.add(root);

    const pointer = { x: 0, y: 0 };
    const look = { x: 0, y: 0 };
    let time = 0;
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.current.paused = reducedMotion;
    setPaused(reducedMotion);

    const draw = () => {
      tunnel.uniforms.uTime.value = time;
      look.x += (pointer.x - look.x) * 0.08;
      look.y += (pointer.y - look.y) * 0.08;
      head.rotation.y = look.x * 0.5;
      head.rotation.x = -look.y * 0.2;
      root.rotation.y = look.x * 0.14;
      root.position.y = Math.sin(time * 1.4) * 0.012;
      pupils.forEach((pupil, i) => {
        pupil.position.x = (i === 0 ? -0.215 : 0.215) + look.x * 0.028;
        pupil.position.y = 0.03 + look.y * 0.02;
      });
      arms[0].rotation.x = Math.sin(time * 1.4) * 0.02;
      arms[1].rotation.x = -Math.sin(time * 1.4) * 0.02;
      renderer.render(scene, camera);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.aspect = aspect;
      const wide = aspect > 1.25;
      root.position.x = wide ? Math.min(2.5, aspect * 1.05) : 0;
      camera.position.set(0, 1.85, wide ? 10.8 : 8.8);
      camera.lookAt(0, 1.75, 0);
      camera.updateProjectionMatrix();
      draw();
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      const delta = clock.getDelta();
      if (controls.current.paused || !visible) return;
      time += delta;
      draw();
    };

    const hero = host.closest(".hero") as HTMLElement;
    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointer.x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointer.y = THREE.MathUtils.clamp(-((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };
    hero.addEventListener("pointermove", onPointerMove);

    controls.current.reset = () => {
      pointer.x = 0;
      pointer.y = 0;
      look.x = 0;
      look.y = 0;
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(host);

    resize();
    loop();

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersection.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  if (failed) return null;

  return (
    <div className="avatar-stage" ref={stage}>
      <div className="avatar-fade" />
      <div className="avatar-bar">
        <span>Move across the hero and she follows your cursor.</span>
        <div>
          <button
            type="button"
            onClick={() => {
              controls.current.paused = !paused;
              setPaused(!paused);
            }}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button type="button" onClick={() => controls.current.reset()}>
            Reset view
          </button>
        </div>
      </div>
    </div>
  );
}
