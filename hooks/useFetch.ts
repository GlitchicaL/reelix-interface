import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';

export function useFetch<T>(url: string, options?: RequestInit) {

  /*
    We use a generic <T> here as the expected data from
    different components can pass in different URLs, thus
    components itself define the type it can expect.
  */

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function fetcher() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
          ...options,
        });

        if (response.status !== 401) {
          setData(await response.json());
          return;
        }

        const refreshResponse = await fetch(`/api/refresh`, {
          method: "POST",
          credentials: "include",
          signal: controller.signal,
          ...options,
        });

        /*
          At this point, if the refresh call fails, then we can
          probably assume the refresh token itself is expired.
        */

        if (!refreshResponse.ok) {
          redirect("/login");
        }

        const retryResponse = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
        });

        setData(await retryResponse.json());
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetcher();

    return () => {
      controller.abort();
    }
  }, [url]);

  return { data, isLoading, error };
}