import Image from "next/image";
import Link from "next/link";

interface Collection {
  collectionId: number,
  collectionName: string,
  vaultName: string,
}

export default async function Home() {
  const response = await fetch("http://localhost:8081/api/collections");
  const collections = await response.json();

  return (
    <main>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-kumbh font-bold text-center text-white pb-12">
          Welcome To Reelix!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((collection: Collection) => (
            <div
              key={collection.collectionId}
              className="bg-card-500 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow justify-items-center"
            >
              <Link href={`/collection/${collection.collectionId}`}>
                <div className="relative">
                  <Image
                    src={`http://localhost:8080/cdn/${collection.vaultName}/${collection.collectionName}/cover.jpg`}
                    alt={collection.collectionName}
                    width={1333}
                    height={2000}
                    className="w-full h-102 object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-60 hover:opacity-30 rounded-md"></div>
                  <p className="absolute inset-0 top-[50%] text-white text-center font-kumbh text-3xl font-bold pointer-events-none">{collection.collectionName}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
