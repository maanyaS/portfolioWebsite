"use client";

import dynamic from "next/dynamic";

const AvatarScene = dynamic(() => import("./AvatarScene"), { ssr: false });

export default function AvatarStage() {
  return <AvatarScene />;
}
