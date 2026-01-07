import * as motion from "motion/react-client"

import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";

import { Gallery } from "@/lib/types";
import { getFullIndex } from "@/lib/utils";

async function Page({
  params,
}: {
  params: Promise<{ vaultId: number }>
}) {
  const { vaultId } = await params;
  const galleriesResponse = await fetch(`http://localhost:8081/api/galleries/${vaultId}`);
  const galleries: Gallery[] = await galleriesResponse.json();

  const actorsResponse = await fetch(`http://localhost:8081/api/actors/${vaultId}`);
  const { actors, vaultName } = await actorsResponse.json();

  return (
    <main>
      <Navigation vaultId={vaultId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actors && actors.length > 0 && (
          <Card
            href={`/actors/${vaultId}`}
            src={`http://localhost:8080/cdn/Vaults/${vaultName}/Pictures/actors/${actors[actors.length - 1].slug}.jpg`}
            alt={`actor`}
            title={`Actors`}
            height={102}
          />
        )}

        {galleries && galleries.map((gallery) => (
          <Card
            key={gallery.id}
            href={`/gallery/${gallery.id}`}
            src={`http://localhost:8080/cdn/Vaults/${gallery.vaultName}/Pictures/${gallery.slug}/${getFullIndex(gallery.imageCount)}.jpg`}
            alt={gallery.slug}
            title={gallery.title}
            height={102}
          />
        ))}
      </div>
    </main>
  );
}

export default Page;