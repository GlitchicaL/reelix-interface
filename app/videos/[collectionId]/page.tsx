"use client";

import { useParams } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import Card from "@/components/Card";

import { Video } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildThumbnailUrl } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const collectionId = params?.collectionId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: videos } = useFetch<Video[]>(`/api/videos/${collectionId}`);

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        {videos && videos[0].collectionName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && BASE_SERVER_URL && videos.map((video: Video, index: number) => (
          <Card
            key={video.id}
            href={`/video/${video.id}`}
            src={buildThumbnailUrl(BASE_SERVER_URL, CDN_PORT, video.vaultSlug, video.collectionSlug, video.slug)}
            alt={video.title}
            title={video.title}
          />
        ))}
      </div>
    </main>
  );
}