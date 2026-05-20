"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client"

interface LinkItemProps {
  text: string,
  href: string,
  isActive: boolean,
}

const underline: React.CSSProperties = {
  position: "absolute",
  bottom: 6,
  left: 0,
  right: 0,
  height: 2,
}

function LinkItem({ text, href, isActive }: LinkItemProps) {
  const [path, setPath] = useState<string>();
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <>
      {isActive ? (
        <motion.li
          className="relative"
          initial={{ scale: 1, zIndex: 100 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={href} className="block text-red-500 py-2 font-carter font-light text-lg tracking-tight">
            {text}
          </Link>

          <div style={underline} className="bg-red-500" />
        </motion.li>
      ) : (
        <motion.li
          className="relative"
          whileHover={{ scale: 1, zIndex: 100 }}
          onHoverStart={() => { setIsHover(true) }}
          onHoverEnd={() => { setIsHover(false) }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={href} className="block py-2 font-carter font-light text-lg tracking-tight">
            {text}
          </Link>

          {path === href && (
            <div style={underline} />
          )}

          {isHover && (
            <motion.div style={underline} initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white" />
          )}
        </motion.li >
      )
      }
    </>
  );
}

export default LinkItem;