"use client";

import { useParams, useRouter } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import SubHeader from "@/components/SubHeader";
import Picture from "@/components/Picture";

import { Gallery } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from '@/lib/constants';
import { buildGalleryUrl } from '@/lib/utils';

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const galleryId = params?.galleryId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: gallery } = useFetch<Gallery>(`/api/gallery/${galleryId}`);

  return (
    <main>
      <SubHeader title={gallery ? gallery?.title : ""} onBack={router.back} />

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 pt-4">

        {BASE_SERVER_URL && gallery && Array.from({ length: gallery.imageCount }).map((_, index) => (
          <Picture
            key={index}
            src={buildGalleryUrl(BASE_SERVER_URL, CDN_PORT, gallery.vaultSlug, gallery.slug, index + 1)}
            alt={`${gallery.slug}_${index + 1}`}
            style={""}
          />
        ))}
      </div>
    </main>
  );
}