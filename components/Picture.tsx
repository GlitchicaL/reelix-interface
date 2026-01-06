"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PictureProps {
  src: string,
  alt: string,
  caption?: string | null,
  width?: number,
  height?: number,
}

function Picture({ src, alt, caption = null, width = 1333, height = 2000 }: PictureProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer relative"
    >
      <div className="overflow-hidden rounded-lg">
        <motion.div
          className="rounded-lg transition-shadow cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
          }}
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`max-w-[${width}px] max-h-[${height}px] object-cover rounded-md opacity-80 -z-10 hover:opacity-100 hover:z-10`}
            loading="eager"
          />
        </motion.div>

        <p className="bg-linear-to-t from-card-500 to-card-500/0 absolute bottom-0 w-full p-4 text-2xl text-center font-bold pointer-events-none">{caption}</p>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-gray-950/70 flex items-center justify-center m-0 z-100 cursor-pointer"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={src}
                alt={alt}
                layoutId="popup-image"
                className="max-w-[80%] max-h-[80%] rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Picture;