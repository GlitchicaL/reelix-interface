"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";

import LinkItem from "./LinkItem";
import { User } from "./icons";

interface NavigationProps {
  vaultId: number,
}

const URLS = [
  { text: "Collections", base: "/vaults" },
  { text: "Gallery", base: "/gallery" },
  { text: "Latest Videos", base: "/videos" },
  { text: "Favorites", base: "/favorites" },
]

function Navigation({ vaultId }: NavigationProps) {
  const [path, setPath] = useState<string>();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="py-12 flex justify-between">
      <ul className="flex gap-12">
        <LinkItem text="Home" href="/" isActive={false} />

        {URLS.map((url) => {
          const href = `${url.base}/${vaultId}`

          return (
            <LinkItem key={url.text} text={url.text} href={href} isActive={href === path ? true : false} />
          )
        })}
      </ul>

      <motion.div
        initial={{ scale: 0.80, zIndex: 100 }}
        whileHover={{ scale: 1, zIndex: 100 }}
        whileTap={{ scale: 0.80 }}
        className="cursor-pointer"
      >
        <User />
      </motion.div>
    </div>
  );
}

export default Navigation;