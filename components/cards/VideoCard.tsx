import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client"

import { Video } from "@/lib/types";

interface CardProps {
  vaultId: number,
  collectionId: number,
  video: Video,
}

function VideoCard({ vaultId, collectionId, video, }: CardProps) {
  return (
    <motion.div
      className="rounded-lg transition-shadow"
      whileHover={{ scale: 1.1, zIndex: 100 }}
      whileTap={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
    >
      <Link href={`/vaults/${vaultId}/collections/${collectionId}/videos/${video.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/Videos/${video.collectionName}/${video.slug}/backdrop.jpg`}
            alt={video.title}
            width={1333}
            height={2000}
            className="w-full h-80 object-cover rounded-md opacity-60 hover:opacity-100"
          />
          <p className="bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-2 text-2xl text-center font-bold pointer-events-none">{video.title}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default VideoCard;