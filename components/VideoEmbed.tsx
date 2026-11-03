"use client";

import { useState } from "react";
import type { Media } from "@/content/site";

// YouTube loads only after a click so the page stays fast.
export default function VideoEmbed({ media }: { media: Media }) {
  const [playing, setPlaying] = useState(false);

  if (media.kind === "image") {
    return (
      <div className="media-frame image">
        <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" />
      </div>
    );
  }

  if (media.kind === "drive") {
    return (
      <div className="media-frame">
        <iframe
          src={`https://drive.google.com/file/d/${media.id}/preview`}
          title={media.title}
          loading="lazy"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="media-frame">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`}
          title={media.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button className="poster" onClick={() => setPlaying(true)} aria-label={`Play ${media.title}`}>
          <img src={`https://i.ytimg.com/vi/${media.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="play" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
