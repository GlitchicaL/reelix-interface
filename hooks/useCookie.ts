import { useEffect, useState } from "react";

export function useCookie(name: string) {
  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!name) return;

    function getCookie() {
      const cookies = document.cookie.split('; ');

      for (let c of cookies) {
        const [key, value] = c.split('=');
        if (key === name) setValue(decodeURIComponent(value));
      }
    }

    getCookie();

    return () => { }
  }, [name]);

  return { value, isLoading, error };
}