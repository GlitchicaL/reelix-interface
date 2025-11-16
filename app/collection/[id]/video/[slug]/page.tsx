import Image from "next/image";
import Link from "next/link";

interface Video {
  title: string,
  slug: string,
  vaultName: string,
  collectionName: string,
}

interface Actor {
  name: string,
  slug: string,
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string, id: number }>
}) {
  const { slug, id } = await params;

  const response = await fetch(`http://localhost:8081/api/video/${id}/${slug}`);
  const video = await response.json();

  console.log(video)

  const videos: Video[] = [];

  return (
    <div className="flex flex-col md:flex-row md:space-x-8">
      <main className="flex-1">
        <section className="flex flex-col gap-[32px] row-start-2 sm:items-start pb-6">
          {/* Preload & Autoplay? */}
          <video
            width="100%"
            height="auto"
            controls
            poster={`http://localhost:8080/cdn/Vaults/${video.vaultName}/${video.collectionName}/${slug}/backdrop.jpg`}
            className="aspect-video object-cover cursor-pointer rounded-3xl"
          >
            <source src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/${video.collectionName}/${slug}/${slug}.mp4`} type="video/mp4" />
            Video tag not supported.
          </video>
        </section>
        <section className="flex flex-col gap-[32px] sm:items-start py-6">
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
        <section className="flex flex-col gap-[32px] sm:items-start py-6">
          <h2 className="text-2xl font-kumbh font-bold">Cast</h2>

          <div className="flex gap-6">
            {video.actors.map((actor: Actor) => (
              <div key={actor.name} className="cursor-pointer relative group">
                <Image src={`http://localhost:8080/cdn/Actors/${video.vaultName}/${actor.slug}.jpg`} alt={"N/A"} width={300} height={600} className="border-2" />
                <div className="absolute inset-0 bg-black opacity-60 hover:opacity-30 rounded-md"></div>
                <p className="absolute inset-0 px-2 flex justify-center items-center text-center font-kumbh text-2xl font-bold pointer-events-none">{actor.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {videos && (
        <aside className="md:w-1/4 mt-4 md:mt-0">
          <h2 className="text-2xl font-kumbh font-bold pb-4">Related Videos</h2>
          {videos.map((video: Video) => (
            <div
              key={video.title}
              className="bg-card-500 rounded-lg cursor-pointer"
            >
              <Link href={`/collection/${id}/video/${video.slug}`}>
                <div className="relative">
                  <Image
                    src={`http://localhost:8080/cdn/${video.vaultName}/${video.collectionName}/${video.slug}/backdrop.jpg`}
                    alt={video.title}
                    width={1000}
                    height={1200}
                    layout="intrinsic"
                    className="aspect-video object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-60 hover:opacity-30 rounded-md"></div>
                  <p className="absolute inset-0 px-2 flex justify-center items-center text-center font-kumbh text-xl font-bold pointer-events-none">{video.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </aside>
      )}
    </div>
  );
}