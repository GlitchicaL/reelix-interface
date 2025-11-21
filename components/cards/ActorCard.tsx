import Image from "next/image";
import { Actor } from "@/lib/types";
import * as motion from "motion/react-client"

interface ActorCardProps {
  vaultName: string,
  actor: Actor
}

function ActorCard({ vaultName, actor }: ActorCardProps) {
  return (
    <motion.div
      className="cursor-pointer relative overflow-hidden"
    >
      <motion.img
        src={`http://localhost:8080/cdn/Actors/${vaultName}/${actor.slug}.jpg`}
        alt={actor.name}
        width={300}
        height={450}
        className="max-w-[300px] max-h-[450px] object-cover opacity-80 hover:opacity-100"
        whileHover={{
          scale: 1.1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
        }}
      />
      <p className="bg-card-500/60 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">{actor.name}</p>
    </motion.div>
  );
}

export default ActorCard;