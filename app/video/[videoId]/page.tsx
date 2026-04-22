"use client";

import { useParams } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import Picture from "@/components/Picture";
import Card from "@/components/Card";
import Backdrop from "@/components/Backdrop";

import { Video, Actor } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildThumbnailUrl, buildActorUrl, buildVideoUrl } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const videoId = params?.videoId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: video } = useFetch<Video>(`/api/video/${videoId}`);

  const videos: Video[] = [];

  return (
    <div className="grid xl:grid-cols-[3fr_1fr]">
      {BASE_SERVER_URL && video && (
        <Backdrop
          serverUrl={BASE_SERVER_URL}
          video={video}
        />
      )}

      <main className="overflow-hidden">
        <section className="flex flex-col gap-[32px] pt-12 pb-6">
          {BASE_SERVER_URL && video && (
            <video
              width="100%"
              height="auto"
              controls
              poster={buildThumbnailUrl(BASE_SERVER_URL, CDN_PORT, video.vaultName, video.collectionName, video.slug)}
              className="aspect-video object-cover cursor-pointer rounded-3xl"
            >
              <source src={buildVideoUrl(BASE_SERVER_URL, CDN_PORT, video.vaultName, video.collectionName, video.slug)} type="video/mp4" />
              Video tag not supported.
            </video>
          )}
        </section>
        <section className="flex flex-col gap-[32px] py-6">
          <h1 className="text-4xl font-kumbh font-bold">{video && video.title}</h1>
          <p className="max-w-[75ch] font-kumbh">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laborum, vero possimus quia fugit natus aliquid atque error
            mollitia, neque quibusdam deserunt eos. Dicta nam, maxime
            voluptas illum quos facere cumque.
          </p>
          <div>
            <div className="flex items-center py-1">
              <p className="text-lg opacity-60 w-20 font-kumbh">Studio</p>
              <p className="text-lg font-kumbh">{video && video.studio}</p>
            </div>
            <div className="flex items-center py-1">
              <p className="text-lg opacity-60 w-20 font-kumbh">Tags</p>
              <p className="text-lg font-kumbh">
                {video && video.tags.map((tag: string, index: number) => `${tag}${index !== video.tags.length - 1 ? "," : ""} `)}
              </p>
            </div>
          </div>
        </section>

        {BASE_SERVER_URL && video && video.actors.length > 0 && (
          <section className="flex flex-col gap-[32px] py-6">
            <h2 className="text-2xl font-kumbh font-bold">Cast</h2>

            <div className="flex gap-6 flex-nowrap w-full overflow-x-auto overflow-y-hidden">
              {video.actors.map((actor: Actor) => (
                <Picture
                  key={actor.slug}
                  src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, video.vaultName, actor.slug)}
                  alt={actor.name}
                  caption={actor.name}
                  style={"max-w-[300px] max-h-[400px]"}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {BASE_SERVER_URL && videos.length > 0 && (
        <aside className="pt-12 xl:mt-0 xl:pl-8">
          <h2 className="text-2xl font-kumbh font-bold pb-4">Related Videos</h2>
          <div className="flex flex-col gap-4">
            {videos.map((video: Video) => (
              <Card
                key={video.id}
                href={`/video/${video.id}`}
                src={buildThumbnailUrl(BASE_SERVER_URL, CDN_PORT, video.vaultName, video.collectionName, video.slug)}
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