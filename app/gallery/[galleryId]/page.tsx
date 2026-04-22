"use client";

import { useParams } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import Picture from "@/components/Picture";

import { Gallery } from "@/lib/types";
import { API_PORT, CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from '@/lib/constants';
import { buildGalleryUrl } from '@/lib/utils';

export default function Page() {
  const params = useParams();
  const galleryId = params?.galleryId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: gallery } = useFetch<Gallery>(`/api/gallery/${galleryId}`);

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        {gallery && gallery.title}
      </h1>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">

        {BASE_SERVER_URL && gallery && Array.from({ length: gallery.imageCount }).map((_, index) => (
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