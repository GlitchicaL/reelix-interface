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

export const VIDEO_QUALITY_OPTIONS: VideoQualityOption[] = [
  { label: "Direct Play", preset: "direct", resolution: "Original", bitrate: "Original" },
  { label: "High", preset: "high", resolution: "Native", bitrate: "35M" },
  { label: "Medium", preset: "medium", resolution: "Native", bitrate: "12M" },
  { label: "Low", preset: "low", resolution: "1080p", bitrate: "8M" },
  { label: "Mobile", preset: "mobile", resolution: "720p", bitrate: "4M" },
];