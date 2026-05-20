"use client";

import { useParams, useRouter } from "next/navigation";
import * as motion from "motion/react-client";

import { useCookie, useFetch } from "@/hooks";

import { ArrowLeft, Refresh } from "@/components/icons";
import Card from "@/components/Card";

import { Video } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildThumbnailUrl } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const router = useRouter();

  const collectionId = params?.collectionId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: videos } = useFetch<Video[]>(`/api/videos/${collectionId}`);

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
            {videos && `${videos[0].vaultName} - ${videos[0].collectionName}`}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos && BASE_SERVER_URL && videos.map((video: Video, index: number) => (
          <Card
            key={video.id}
            href={`/video/${video.id}`}
            src={buildThumbnailUrl(BASE_SERVER_URL, CDN_PORT, video.vaultSlug, video.collectionSlug, video.slug)}
            alt={video.title}
            title={video.title}
          />
        ))}
      </div>
    </main>
  );
}