import { cookies } from "next/headers";

import Card from "@/components/Card";

import { Video } from "@/lib/types";
import { API_PORT, CDN_PORT } from "@/lib/constants";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, collectionId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value;

  const { vaultId, collectionId } = await params;

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
            src={`${BASE_SERVER_URL}:${CDN_PORT}/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/backdrop.jpg`}
            alt={video.title}
            title={video.title}
          />
        ))}
      </div>
    </main>
  );
}