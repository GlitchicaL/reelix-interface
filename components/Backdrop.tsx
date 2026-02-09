"use client";

import { useEffect, useState } from "react";

import { CDN_PORT } from "@/lib/constants";
import { buildBackdropUrl, buildThumbnailUrl } from "@/lib/utils";
import { Video } from "@/lib/types";


interface BackdropProps {
  serverUrl: string,
  video: Video
}

function Backdrop({ serverUrl, video }: BackdropProps) {
  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    const backdropUrl = buildBackdropUrl(serverUrl, CDN_PORT, video.vaultName, video.collectionName, video.slug);
    const thumbnailUrl = buildThumbnailUrl(serverUrl, CDN_PORT, video.vaultName, video.collectionName, video.slug);

    // By default we want to use the thumbnail url as the backdrop
    // as there is a chance only the thumbnail is available.
    setBackdrop(thumbnailUrl);

    const image = new Image();

    // Once the image src is set, if the image loads, then
    // we'll use the backdrop url over the thumbnail
    image.onload = () => {
      setBackdrop(backdropUrl);
    }

    // There is a chance that both the thumbnail and backdrop may not
    // exist, therefore we set null and display no backdrop
    image.onerror = () => {
      setBackdrop(null);
    }

    image.src = backdropUrl;
  }, [serverUrl, video.vaultName, video.collectionName, video.slug, CDN_PORT])

  return (
    <div className="fixed -z-50 inset-0 overflow-hidden">
      {backdrop && (
        <img
          src={backdrop}
          alt="Video backdrop"
          className="h-full w-full object-cover object-center opacity-20"
        />
      )}
    </div>
  );
}

export default Backdrop;