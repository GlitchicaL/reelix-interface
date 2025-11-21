import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client"

interface CardProps {
  vaultId: number,
  collectionId: number,
  video: {
    id: number,
    title: string,
    slug: string,
    vaultName: string,
    collectionName: string,
  }
}

function VideoCard({ vaultId, collectionId, video, }: CardProps) {
  return (
    <motion.div
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1, zIndex: 100 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
    >
      <Link href={`/vaults/${vaultId}/collections/${collectionId}/videos/${video.id}`}>
        <div className="relative overflow-hidden">
          <motion.img
            src={`http://localhost:8080/cdn/Vaults/${video.vaultName}/${video.collectionName}/${video.slug}/backdrop.jpg`}
            alt={video.title}
            width={1333}
            height={2000}
            className="w-full h-80 object-cover rounded-md opacity-60 hover:opacity-100"
          />
          <p className="bg-card-500/60 absolute bottom-0 w-full p-2 text-2xl text-center font-bold pointer-events-none">{video.title}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default VideoCard;