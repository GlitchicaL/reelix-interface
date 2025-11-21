import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client"

import { Collection } from "@/lib/types";

interface CollectionCardProps {
  vaultId: number,
  collection: Collection
}

function CollectionCard({ vaultId, collection }: CollectionCardProps) {
  return (
    <motion.div
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1, zIndex: 100 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
    >
      <Link href={`/vaults/${vaultId}/collections/${collection.collectionId}`}>
        <div className="relative">
          <Image
            src={`http://localhost:8080/cdn/Vaults/${collection.vaultName}/${collection.collectionName}/cover.jpg`}
            alt={collection.collectionName}
            width={1333}
            height={2000}
            className="w-full h-102 object-cover rounded-md opacity-60 hover:opacity-100"
          />
          <p className="bg-card-500/60 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">{collection.collectionName}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default CollectionCard;