"use client";

import { useParams } from 'next/navigation';

import { useCookie, useFetch } from '@/hooks';

import SubHeader from "@/components/SubHeader";
import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Actor, Gallery, Vault } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from '@/lib/constants';
import { buildActorUrl, buildGalleryUrl } from '@/lib/utils';

export default function Page() {
  const params = useParams();
  const vaultId = params?.vaultId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: galleries } = useFetch<Gallery[]>(`/api/galleries/${vaultId}`);
  const { data } = useFetch<{ actors: Actor[], vault: Vault }>(`/api/actors/${vaultId}`);

  const { actors, vault } = data ?? { actors: [], vaultSlug: null };

  return (
    <main>
      <SubHeader title={vault ? vault?.name : ""} />

      <Navigation vaultId={vaultId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {BASE_SERVER_URL && vault && actors && actors.length > 0 && (
          <Card
            href={`/actors/${vaultId}`}
            src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, vault.slug, actors[actors.length - 1].slug)}
            alt={`actor`}
            title={`Actors`}
            style={"h-102"}
          />
        )}

        {BASE_SERVER_URL && galleries && galleries.map((gallery) => (
          <Card
            key={gallery.id}
            href={`/gallery/${gallery.id}`}
            src={buildGalleryUrl(BASE_SERVER_URL, CDN_PORT, gallery.vaultSlug, gallery.slug, gallery.imageCount)}
            alt={gallery.title}
            title={gallery.title}
            style={"h-102"}
          />
        ))}
      </div>
    </main>
  );
}