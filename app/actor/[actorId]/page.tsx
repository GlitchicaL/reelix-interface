"use client";

import { useParams, useRouter } from "next/navigation";

import { useCookie, useFetch } from "@/hooks";

import SubHeader from "@/components/SubHeader";
import Picture from "@/components/Picture";
import Card from "@/components/Card";

import { Actor } from "@/lib/types";
import { CDN_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";
import { buildActorUrl, buildCollectionUrl } from "@/lib/utils";


export default function Page() {
  const params = useParams();
  const router = useRouter();

  const actorId = params?.actorId as string;

  const { value: BASE_SERVER_URL } = useCookie(REELIX_COOKIE_BASE_SERVER_URL);
  const { data: actor } = useFetch<Actor>(`/api/actor/${actorId}`);

  return (
    <main>
      <SubHeader title={`${actor?.name}`} onBack={router.back} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          {BASE_SERVER_URL && actor && actor.collections.length > 0 && (
          <Picture
              key={actor.slug}
              src={buildActorUrl(BASE_SERVER_URL, CDN_PORT, actor.collections[0].vaultSlug, actor.slug)}
              alt={actor.name}
              width={300}
              height={450}
          />
          )}
        </div>

        <div className="col-span-4">
          <h2 className="text-xl font-carter text-white pb-4">Biography</h2>
          <p className="w-[75ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Doloremque assumenda exercitationem id, nemo ab quidem ratione 
            voluptatum vero facere, debitis accusantium, dolor officia 
            minima eius? Numquam at dolorem fuga voluptate!
          </p>
        </div>

        <div className="col-span-12">
          <h2 className="text-xl font-carter text-white pb-4">As Seen In</h2>
          <div className="flex flex-wrap gap-4">
            {BASE_SERVER_URL && actor && actor.collections.length > 0 && actor.collections.map((collection) => (
              <Card
                key={collection.id}
                href={`/videos/${collection.id}`}
                src={buildCollectionUrl(BASE_SERVER_URL, CDN_PORT, collection.vaultSlug, collection.slug)}
                alt={collection.name}
                title={collection.name}
                style={"h-102"}
              />
            ))}
          </div>
        </div>
      </div>
    </main >
  );
}