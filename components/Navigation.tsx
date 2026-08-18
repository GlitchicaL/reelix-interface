"use client";

import { useEffect, useState } from "react";

import LinkItem from "./LinkItem";

interface NavigationProps {
  vaultId: string,
}

const URLS = [
  { text: "Collections", base: "/collections" },
  { text: "Galleries", base: "/galleries" },
  { text: "Latest Videos", base: "/latest" },
  { text: "Favorites", base: "/favorites" },
]

function Navigation({ vaultId }: NavigationProps) {
  const [path, setPath] = useState<string>();

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <div className="pb-4 flex justify-between">
      <ul className="flex gap-8">
        <LinkItem text="Vaults" href="/" isActive={false} />

        {URLS.map((url) => {
          const href = `${url.base}/${vaultId}`

          return (
            <LinkItem key={url.text} text={url.text} href={href} isActive={href === path ? true : false} />
          )
        })}
      </ul>
    </div>
  );
}

export default Navigation;