import { cookies } from 'next/headers';

import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Collection } from "@/lib/types";
import { API_PORT, CDN_PORT } from "@/lib/constants";
import { buildCollectionUrl } from "@/lib/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value ?? "";

  const { vaultId } = await params;
  const response = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/collections/${vaultId}`);
  const collections: Collection[] = await response.json();

  return (
    <main>
      <div className="max-w-7xl">
        <Navigation vaultId={vaultId} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections && collections.map((collection: Collection) => (
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
