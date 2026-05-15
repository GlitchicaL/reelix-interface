"use client";

import { useParams } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import Picture from "@/components/Picture";

import { Actor, Vault } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildActorUrl } from "@/lib/utils";


export default function Page() {
  const params = useParams();
  const vaultId = params?.vaultId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data } = useFetch<{ actors: Actor[], vaultSlug: string }>(`/api/actors/${vaultId}`);

  const { actors, vaultSlug } = data ?? { actors: [], vaultSlug: null };

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        Actors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BASE_SERVER_URL && vaultSlug && actors && actors.map((actor: Actor) => (
          <Picture
            key={actor.slug}
            src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, vaultSlug, actor.slug)}
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