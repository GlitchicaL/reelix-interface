import Picture from "@/components/Picture";
import Card from "@/components/Card";

import { Video, Actor } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, collectionId: number, videoId: number }>
}) {
  const { vaultId, collectionId, videoId } = await params;

  const response = await fetch(`http://localhost:8081/api/video/${videoId}`);
  const video = await response.json();

  const videos: Video[] = [];

  return (
    <div className="grid xl:grid-cols-[3fr_1fr]">
      <div className="fixed -z-50 inset-0 overflow-hidden">
        <img
          src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/cover.jpg`}
          alt=""
          className="h-full w-full object-cover object-center opacity-20"
        />
      </div>

      <main className="overflow-hidden">
        <section className="flex flex-col gap-[32px] pt-12 pb-6">
          {/* Preload & Autoplay? */}
          <video
            width="100%"
            height="auto"
            controls
            poster={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/backdrop.jpg`}
            className="aspect-video object-cover cursor-pointer rounded-3xl"
          >
            <source src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/${video.slug}.mp4`} type="video/mp4" />
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
                <Picture
                  key={actor.slug}
                  src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Pictures/actors/${actor.slug}.jpg`}
                  alt={actor.name}
                  caption={actor.name}
                  style={"max-w-[300px] max-h-[400px]"}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {videos && (
        <aside className="pt-12 xl:mt-0 xl:pl-8">
          <h2 className="text-2xl font-kumbh font-bold pb-4">Related Videos</h2>
          <div className="flex flex-col gap-4">
            {videos.map((video: Video) => (
              <Card
                key={video.id}
                href={`/video/${video.id}`}
                src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/backdrop.jpg`}
                alt={video.title}
                title={video.title}
              />
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}