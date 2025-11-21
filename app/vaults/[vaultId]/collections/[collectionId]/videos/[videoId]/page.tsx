import { ActorCard, VideoCard } from "@/components/cards";
import { Video, Actor } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, collectionId: number, videoId: number }>
}) {
  const { vaultId, collectionId, videoId } = await params;

  const response = await fetch(`http://localhost:8081/api/video/${vaultId}/${collectionId}/${videoId}`);
  const video = await response.json();

  const videos: Video[] = [];

  return (
    <div className="grid xl:grid-cols-[3fr_1fr]">
      <main className="overflow-hidden">
        <section className="flex flex-col gap-[32px] pb-6">
          {/* Preload & Autoplay? */}
          <video
            width="100%"
            height="auto"
            controls
            poster={`http://localhost:8080/cdn/Vaults/${video.vaultName}/${video.collectionName}/${video.slug}/backdrop.jpg`}
            className="aspect-video object-cover cursor-pointer rounded-3xl"
          >
            <source src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/${video.collectionName}/${video.slug}/${video.slug}.mp4`} type="video/mp4" />
            Video tag not supported.
          </video>
        </section>
        <section className="flex flex-col gap-[32px] py-6">
          <h1 className="text-4xl font-kumbh font-bold">{video.title}</h1>
          <p className="max-w-[75ch] font-kumbh">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laborum, vero possimus quia fugit natus aliquid atque error
            mollitia, neque quibusdam deserunt eos. Dicta nam, maxime
            voluptas illum quos facere cumque.
          </p>
          <div>
            <div className="flex items-center py-1">
              <p className="text-lg opacity-60 w-20 font-kumbh">Studio</p>
              <p className="text-lg font-kumbh">{video.studio}</p>
            </div>
            <div className="flex items-center py-1">
              <p className="text-lg opacity-60 w-20 font-kumbh">Tags</p>
              <p className="text-lg font-kumbh">
                {video.tags.map((tag: string, index: number) => `${tag}${index !== video.tags.length - 1 ? "," : ""} `)}
              </p>
            </div>
          </div>
        </section>

        {video.actors.length > 0 && (
          <section className="flex flex-col gap-[32px] py-6">
            <h2 className="text-2xl font-kumbh font-bold">Cast</h2>

            <div className="flex gap-6 flex-nowrap w-full overflow-x-auto overflow-y-hidden">
              {video.actors.map((actor: Actor) => (
                <ActorCard key={actor.name} vaultName={video.vaultName} actor={actor} />
              ))}
            </div>
          </section>
        )}
      </main>

      {videos && (
        <aside className="mt-4 xl:mt-0 xl:pl-8">
          <h2 className="text-2xl font-kumbh font-bold pb-4">Related Videos</h2>
          {videos.map((video: Video) => (
            <VideoCard key={video.title} vaultId={vaultId} collectionId={collectionId} video={video} />
          ))}
        </aside>
      )}
    </div>
  );
}