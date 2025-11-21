import { VideoCard } from "@/components/cards";
import { Video } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, collectionId: number }>
}) {
  const { vaultId, collectionId } = await params;

  const response = await fetch(`http://localhost:8081/api/videos/${vaultId}/${collectionId}`);
  const videos = await response.json();

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-center text-white mb-12">
        {videos && videos[0].collectionName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && videos.map((video: Video) => (
          <VideoCard key={video.title} vaultId={vaultId} collectionId={collectionId} video={video} />
        ))}
      </div>
    </main>
  );
}