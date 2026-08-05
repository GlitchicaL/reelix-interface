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
  name: string,
  slug: string,
}

export interface VideoStreamResponse {
  playlist: string;
}

export type VideoQualityPreset = "high" | "medium" | "low" | "mobile" | "direct";

export interface VideoQualityOption {
  label: string;
  preset: VideoQualityPreset;
  resolution: string;
  bitrate: string;
}