import { useState, useCallback } from "react";
import { VideoStreamResponse, VideoQualityPreset } from "@/lib/types";

export function useVideoStream(videoId: string) {
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStream = useCallback(async (qualityPreset: VideoQualityPreset) => {
    if (qualityPreset === "direct") {
      setPlaylistUrl(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/video/${videoId}/stream`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quality: qualityPreset }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stream: ${response.statusText}`);
      }

      const data: VideoStreamResponse = await response.json();
      setPlaylistUrl(data.playlist);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [videoId]);

  return { playlistUrl, isLoading, error, fetchStream };
}
