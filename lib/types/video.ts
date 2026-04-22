export interface Video {
  id: number,
  title: string,
  slug: string,
  vaultName: string,
  collectionName: string,
  studio: string,
  tags: string[],
  actors: Actor[],
}

export interface Actor {
  name: string,
  slug: string,
}