"use client";

import { useParams, useRouter } from "next/navigation";
import { useCookie, useFetch } from "@/hooks";

import SubHeader from "@/components/SubHeader";
import Card from "@/components/Card";

import { Video } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildThumbnailUrl } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const collectionId = params?.collectionId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: videos } = useFetch<Video[]>(`/api/videos/${collectionId}`);

  return (
    <main>
      <SubHeader title={videos ? `${videos[0].vaultName} - ${videos[0].collectionName}` : ""} onBack={router.back} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
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