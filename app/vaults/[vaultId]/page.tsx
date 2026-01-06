import { CollectionCard } from "@/components/cards";
import Navigation from "@/components/Navigation";
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
          {collections.length > 0 && collections.map((collection: Collection) => (
            <CollectionCard key={collection.id} vaultId={vaultId} collection={collection} />
          ))}
        </div>
      </div>
    </main>
  );
}
