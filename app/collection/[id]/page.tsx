import Link from "next/link";
import Image from "next/image";

interface Video {
  title: string,
  slug: string,
  vaultName: string,
  collectionName: string,
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params;

  const response = await fetch(`http://localhost:8081/api/videos/${id}`);
  const videos = await response.json();

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-center text-white mb-12">
        {videos && videos[0].collectionName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: Video) => (
          <div
            key={video.title}
            className="bg-card-500 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
          >
            <Link href={`/collection/${id}/video/${video.slug}`}>
              <div className="relative">
                <Image
                  // src={collection.image ?? "/placeholder.jpg"}
                  src={`http://localhost:8080/cdn/${video.vaultName}/${video.collectionName}/${video.slug}/backdrop.jpg`}
                  alt={video.title}
                  width={1333}
                  height={2000}
                  className="w-full h-80 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black opacity-60 hover:opacity-30 rounded-md"></div>
                <p className="absolute inset-0 top-[50%] text-white text-center font-kumbh text-3xl font-bold pointer-events-none">{video.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}