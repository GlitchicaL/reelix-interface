import { VideoQualityOption } from "../types";

export const VIDEO_QUALITY_OPTIONS: VideoQualityOption[] = [
  { label: "Direct Play", preset: "direct", resolution: "Original", bitrate: "Original" },
  { label: "High", preset: "high", resolution: "Native", bitrate: "35M" },
  { label: "Medium", preset: "medium", resolution: "Native", bitrate: "12M" },
  { label: "Low", preset: "low", resolution: "1080p", bitrate: "8M" },
  { label: "Mobile", preset: "mobile", resolution: "720p", bitrate: "4M" },
];