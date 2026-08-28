"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import SubHeader from "@/components/SubHeader";
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
      <SubHeader title={`${vault && vault?.name} - Actors`} onBack={router.back} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BASE_SERVER_URL && vault && actors && actors.map((actor: Actor) => (
          <Link href={`/actor/${actor.id}`} key={actor.slug}>
            <Picture
              src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, vault.slug, actor.slug)}
              alt={actor.name}
              caption={actor.name}
              allowPopup={false}
              width={300}
              height={450}
            />
          </Link>
        ))}
      </div>
    </main >
  );
}