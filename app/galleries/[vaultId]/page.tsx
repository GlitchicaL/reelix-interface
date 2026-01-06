import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client"

import Navigation from "@/components/Navigation";

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
          <motion.div
            className="rounded-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
          >
            <Link href={`/actors/${vaultId}`}>
              <div className="relative">
                <Image
                  src={`http://localhost:8080/cdn/Vaults/${vaultName}/Pictures/actors/${actors[actors.length - 1].slug}.jpg`}
                  alt={""}
                  width={1333}
                  height={2000}
                  className="w-full h-102 object-cover rounded-md opacity-60 hover:opacity-100"
                />
                <p className="bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">Actors</p>
              </div>
            </Link>
          </motion.div>
        )}

        {galleries && galleries.map((gallery) => (
          <motion.div
            key={gallery.id}
            className="rounded-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
          >
            <Link href={`/gallery/${gallery.id}`}>
              <div className="relative">
                <Image
                  src={`http://localhost:8080/cdn/Vaults/${gallery.vaultName}/Pictures/${gallery.slug}/${getFullIndex(gallery.imageCount)}.jpg`}
                  alt={gallery.slug}
                  width={1333}
                  height={2000}
                  className="w-full h-102 object-cover rounded-md opacity-60 hover:opacity-100"
                />
                <p className="bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">{gallery.title}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default Page;