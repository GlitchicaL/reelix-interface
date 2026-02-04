import { cookies } from 'next/headers';

import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Gallery } from "@/lib/types";
import { API_PORT, CDN_PORT } from '@/lib/constants';
import { buildActorUrl, buildGalleryUrl } from '@/lib/utils';

async function Page({
  params,
}: {
  params: Promise<{ vaultId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value ?? "";

  const { vaultId } = await params;
  const galleriesResponse = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/galleries/${vaultId}`);
  const galleries: Gallery[] = await galleriesResponse.json();

  const actorsResponse = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/actors/${vaultId}`);
  const { actors, vaultName } = await actorsResponse.json();

  return (
    <main>
      <Navigation vaultId={vaultId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actors && actors.length > 0 && (
          <Card
            href={`/actors/${vaultId}`}
            src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, vaultName, actors[actors.length - 1].slug)}
            alt={`actor`}
            title={`Actors`}
            style={"h-102"}
          />
        )}

        {galleries && galleries.map((gallery) => (
          <Card
            key={gallery.id}
            href={`/gallery/${gallery.id}`}
            src={buildGalleryUrl(BASE_SERVER_URL, CDN_PORT, gallery.vaultName, gallery.slug, gallery.imageCount)}
            alt={gallery.slug}
            title={gallery.title}
            style={"h-102"}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;