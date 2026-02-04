import { cookies } from "next/headers";

import Card from "@/components/Card";

import { Video } from "@/lib/types";
import { API_PORT, CDN_PORT } from "@/lib/constants";
import { buildThumbnailUrl } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ collectionId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value ?? "";

  const { collectionId } = await params;

  const response = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/videos/${collectionId}`);
  const videos = await response.json();

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        {videos && videos[0].collectionName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && videos.map((video: Video, index: number) => (
          <Card
            key={video.id}
            href={`/video/${video.id}`}
            src={buildThumbnailUrl(BASE_SERVER_URL, CDN_PORT, video.vaultName, video.collectionName, video.slug)}
            alt={video.title}
            title={video.title}
          />
        ))}
      </div>
    </main>
  );
}