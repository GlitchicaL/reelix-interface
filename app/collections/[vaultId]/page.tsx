"use client";

import { useParams } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Collection } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildCollectionUrl } from "@/lib/utils";

export default function Page() {
  const params = useParams();
  const vaultId = params?.vaultId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: collections } = useFetch<Collection[]>(`/api/collections/${vaultId}`);

  return (
    <main>
      <div className="max-w-7xl">
        <Navigation vaultId={vaultId} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections && BASE_SERVER_URL && collections.map((collection: Collection) => (
            <Card
              key={collection.id}
              href={`/videos/${collection.id}`}
              src={buildCollectionUrl(BASE_SERVER_URL, CDN_PORT, collection.vaultName, collection.name)}
              alt={collection.name}
              title={collection.name}
              style={"h-102"}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
