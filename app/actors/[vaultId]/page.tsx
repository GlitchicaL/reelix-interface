import Picture from "@/components/Picture";
import { Actor, Vault } from "@/lib/types";

async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, galleryId: number }>
}) {
  const { vaultId } = await params;
  const actorsResponse = await fetch(`http://localhost:8081/api/actors/${vaultId}`);
  const { actors } = await actorsResponse.json();

  const vaultResponse = await fetch(`http://localhost:8081/api/vault/${vaultId}`);
  const vault: Vault = await vaultResponse.json();

  return (
    <main>
      <h1 className="text-4xl font-kumbh font-bold text-white py-12">
        Actors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {actors.map((actor: Actor) => (
          <Picture
            key={actor.slug}
            src={`http://localhost:8080/cdn/Vaults/${vault.name}/Pictures/actors/${actor.slug}.jpg`}
            alt={actor.name}
            caption={actor.name}
            width={300}
            height={450}
          />
        ))}
      </div>
    </main >
  );
}

export default Page;