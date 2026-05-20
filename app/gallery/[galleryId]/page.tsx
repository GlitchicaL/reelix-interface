"use client";

import { useParams, useRouter } from "next/navigation";
import * as motion from "motion/react-client";

import { useCookie, useFetch } from "@/hooks";

import { ArrowLeft, Refresh } from "@/components/icons";
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
      <div className="flex place-items-center justify-between">
        <div className="flex place-items-center gap-4">
          {window && window.history.length > 1 && (
            <motion.button
              onClick={() => router.back()}
              initial={{ scale: 0.80, zIndex: 100 }}
              whileHover={{ scale: 1, zIndex: 100 }}
              whileTap={{ scale: 0.80 }}
              className="cursor-pointer"
            >
              <ArrowLeft />
            </motion.button>
          )}

          <h1 className="text-3xl font-kumbh font-bold text-white py-12">
            {gallery && gallery.title}
          </h1>
        </div>

        <div>
          <motion.button
            initial={{ scale: 0.80, zIndex: 100 }}
            whileHover={{ scale: 1, zIndex: 100 }}
            whileTap={{ scale: 0.80 }}
            className="cursor-pointer"
          >
            <Refresh />
          </motion.button>
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">

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