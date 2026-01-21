import { cookies } from 'next/headers';

import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Gallery } from "@/lib/types";
import { getFullIndex } from "@/lib/utils";
import { API_PORT, CDN_PORT } from '@/lib/constants';

async function Page({
  params,
}: {
  params: Promise<{ vaultId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value;

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
            src={`${BASE_SERVER_URL}:${CDN_PORT}/cdn/Vaults/${vaultName}/Pictures/actors/${actors[actors.length - 1].slug}.jpg`}
            alt={`actor`}
            title={`Actors`}
            style={"h-102"}
          />
        )}

        {galleries && galleries.map((gallery) => (
          <Card
            key={gallery.id}
            href={`/gallery/${gallery.id}`}
            src={`${BASE_SERVER_URL}:${CDN_PORT}/cdn/Vaults/${gallery.vaultName}/Pictures/${gallery.slug}/${getFullIndex(gallery.imageCount)}.jpg`}
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