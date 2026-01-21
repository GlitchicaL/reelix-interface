import { cookies } from "next/headers";

import Picture from "@/components/Picture";

import { Actor, Vault } from "@/lib/types";
import { API_PORT, CDN_PORT } from "@/lib/constants";

async function Page({
  params,
}: {
  params: Promise<{ vaultId: number, galleryId: number }>
}) {
  const BASE_SERVER_URL = (await cookies()).get('reelix_base_server_url')?.value;

  const { vaultId } = await params;
  const actorsResponse = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/actors/${vaultId}`);
  const { actors } = await actorsResponse.json();

  const vaultResponse = await fetch(`${BASE_SERVER_URL}:${API_PORT}/api/vault/${vaultId}`);
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
            src={`${BASE_SERVER_URL}:${CDN_PORT}/cdn/Vaults/${vault.name}/Pictures/actors/${actor.slug}.jpg`}
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