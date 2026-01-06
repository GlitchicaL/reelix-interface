import Picture from "@/components/Picture";

import { Gallery } from "@/lib/types";
import { getFullIndex } from "@/lib/utils";

async function Page({
  params,
}: {
  params: Promise<{ galleryId: number }>
}) {
  const { galleryId } = await params;

  const response = await fetch(`http://localhost:8081/api/gallery/${galleryId}`);
  const gallery: Gallery = await response.json();

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        {gallery && gallery.title}
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">

        {Array.from({ length: gallery.imageCount }).map((_, index) => (
          <Picture
            key={index}
            src={`http://localhost:8080/cdn/Vaults/${gallery.vaultName}/Pictures/${gallery.slug}/${getFullIndex(index + 1)}.jpg`}
            alt={`${gallery.slug}_${getFullIndex(index + 1)}.jpg`}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;