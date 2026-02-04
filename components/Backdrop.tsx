"use client";

import { useState } from "react";

import { CDN_PORT } from "@/lib/constants";
import { buildBackdropUrl, buildThumbnailUrl } from "@/lib/utils";
import { Video } from "@/lib/types";


interface BackdropProps {
  serverUrl: string,
  video: Video
}

function Backdrop({ serverUrl, video }: BackdropProps) {
  const [backdrop, setBackdrop] = useState<string>(buildBackdropUrl(serverUrl, CDN_PORT, video.vaultName, video.collectionName, video.slug));

  return (
    <div className="fixed -z-50 inset-0 overflow-hidden">
      <img
        src={backdrop}
        alt="Video backdrop"
        className="h-full w-full object-cover object-center opacity-20"
        onError={() => setBackdrop(buildThumbnailUrl(serverUrl, CDN_PORT, video.vaultName, video.collectionName, video.slug))}
      />
    </div>
  );
}

export default Backdrop;