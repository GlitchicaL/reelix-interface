"use client";

import Image from "next/image";
import { Actor } from "@/lib/types";
import * as motion from "motion/react-client";
import { useState } from "react";

interface ActorCardProps {
  vaultName: string,
  actor: Actor,
}

function ActorCard({ vaultName, actor }: ActorCardProps) {
  const [show, setShow] = useState(true);

  return (
    <div
      className="cursor-pointer relative"
    >
      <div className="overflow-hidden">
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
          }}
        >
          <Image
            src={show ? `http://localhost:8080/cdn/Vaults/${vaultName}/Pictures/actors/${actor.slug}.jpg` : `http://localhost:8080/cdn/placeholder.jpg`}
            alt={actor.name}
            width={300}
            height={450}
            className="max-w-[300px] max-h-[450px] object-cover opacity-80 hover:opacity-100"
            onError={() => setShow(false)}
          />
        </motion.div>
        <p className="bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">{actor.name}</p>
      </div>
    </div>
  );
}

export default ActorCard;