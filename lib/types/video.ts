export interface Video {
  id: number,
  title: string,
  slug: string,
  vaultName: string,
  collectionName: string,
  actors: Actor[],
}

export interface Actor {
  name: string,
  slug: string,
}