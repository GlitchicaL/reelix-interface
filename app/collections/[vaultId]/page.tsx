import Navigation from "@/components/Navigation";
import Card from "@/components/Card";

import { Collection } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ vaultId: number }>
}) {
  const { vaultId } = await params;
  const response = await fetch(`http://localhost:8081/api/collections/${vaultId}`);
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
              src={`http://localhost:8080/cdn/Vaults/${collection.vaultName}/Videos/${collection.name}/cover.jpg`}
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
