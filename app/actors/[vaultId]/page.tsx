"use client";

import { useParams, useRouter } from "next/navigation";
import * as motion from "motion/react-client";

import { useCookie, useFetch } from "@/hooks";

import { ArrowLeft, Refresh } from "@/components/icons";
import Picture from "@/components/Picture";

import { Actor, Vault } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildActorUrl } from "@/lib/utils";


export default function Page() {
  const params = useParams();
  const router = useRouter();

  const vaultId = params?.vaultId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data } = useFetch<{ actors: Actor[], vault: Vault }>(`/api/actors/${vaultId}`);

  const { actors, vault } = data ?? { actors: [], vaultSlug: null };

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
            {vault && `${vault?.name} - Actors`}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BASE_SERVER_URL && vault && actors && actors.map((actor: Actor) => (
          <Picture
            key={actor.slug}
            src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, vault.slug, actor.slug)}
            alt={actor.name}
            caption={actor.name}
            width={300}
            height={450}
          />
        ))}
      </div>
    </main >
  );
}