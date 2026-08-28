import { Collection } from "./collection";

export interface Video {
  id: number,
  title: string,
  slug: string,
  vaultName: string,
  vaultSlug: string,
  collectionName: string,
  collectionSlug: string,
  studio: string,
  tags: string[],
  actors: Actor[],
}

export interface Actor {
  id: number,
  name: string,
  slug: string,
  collections: Collection[],
}