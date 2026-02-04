import { cookies } from 'next/headers';

import Picture from "@/components/Picture";

import { Gallery } from "@/lib/types";
import { API_PORT, CDN_PORT } from '@/lib/constants';
import { buildGalleryUrl } from '@/lib/utils';

async function Page({
  params,
}: {
  params: Promise<{ galleryId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value ?? "";

  const { galleryId } = await params;

  const response = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/gallery/${galleryId}`);
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
            src={buildGalleryUrl(BASE_SERVER_URL, CDN_PORT, gallery.vaultName, gallery.slug, index + 1)}
            alt={`${gallery.slug}_${index + 1}.jpg`}
            style={""}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;