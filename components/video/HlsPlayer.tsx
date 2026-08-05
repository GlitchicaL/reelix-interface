"use client";

import { useEffect, useRef, useState } from "react";
import Hls, { Level } from "hls.js";
import { VideoQualityPreset } from "@/lib/types";

interface HlsPlayerProps {
  playlistUrl: string;
  posterUrl: string;
  onHlsError: () => void;
  selectedQuality: VideoQualityPreset;
}

export default function HlsPlayer({
  playlistUrl,
  posterUrl,
  onHlsError,
  selectedQuality,
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [qualityLevels, setQualityLevels] = useState<Level[]>([]);

  useEffect(() => {
    if (!videoRef.current || !playlistUrl) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
      });

      hls.loadSource(playlistUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setQualityLevels(data.levels);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          onHlsError();
          return;
        }
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playlistUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [playlistUrl, onHlsError]);

  useEffect(() => {
    if (!hlsRef.current || qualityLevels.length === 0) {
      return;
    }

    const levelIndex = mapPresetToLevel(selectedQuality, qualityLevels);
    hlsRef.current.currentLevel = levelIndex;
  }, [selectedQuality, qualityLevels]);

  return (
    <video
      ref={videoRef}
      width="100%"
      height="auto"
      controls
      poster={posterUrl}
      className="aspect-video object-cover cursor-pointer rounded-3xl"
    />
  );
}

function mapPresetToLevel(preset: VideoQualityPreset, levels: Level[]): number {
  const presetBitrates: Record<Exclude<VideoQualityPreset, "direct">, number> = {
    high: 35000000,
    medium: 12000000,
    low: 8000000,
    mobile: 4000000,
  };

  const targetBitrate = presetBitrates[preset as Exclude<VideoQualityPreset, "direct">];

  return levels.reduce((closest, _level, index) => {
    const currentLevel = levels[closest];
    const diff = Math.abs(_level.bitrate - targetBitrate);
    const closestDiff = Math.abs(currentLevel.bitrate - targetBitrate);
    return diff < closestDiff ? index : closest;
  }, 0);
}
