"use client";

import Image from "next/image";
import Link from "next/link";

import { useCookie, useFetch } from "@/hooks";
import { Vault } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";

export default function Home() {
  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: vaults } = useFetch<Vault[]>("/api/vaults");

  return (
    <main>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-kumbh font-bold text-white py-12">
          Welcome To Reelix!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vaults && vaults.map((vault: Vault) => (
            <div
              key={vault.id}
              className="bg-card-500 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow justify-items-center"
            >
              <Link href={`/collections/${vault.id}`}>
                <div className="relative">
                  <Image
                    src={`${BASE_SERVER_URL}:${CDN_PORT}/cdn/Vaults/${vault.name}/cover.jpg`}
                    alt={vault.name}
                    width={1333}
                    height={2000}
                    className="w-full h-102 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-60 hover:opacity-30 rounded-md"></div>
                  <p className="absolute inset-0 top-[50%] text-white text-center font-kumbh text-3xl font-bold pointer-events-none">{vault.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
