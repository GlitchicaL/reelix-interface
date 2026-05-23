"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { setBaseServerURL } from '@/app/actions/set-base-server-url';

export default function Page() {
  const [serverIP, setServerIP] = useState<string>("");
  const [rememberServer, setRememberServer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  async function connectHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await setBaseServerURL(serverIP, rememberServer);
      router.push("/");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occured");
      return;
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div>
        <h1 className="text-4xl font-kumbh font-bold text-white text-center pt-12">
          Welcome To <span className="font-carter font-normal">Reelix!</span>
        </h1>
      </div>

      <form onSubmit={(e) => connectHandler(e)} className="p-6 space-y-4">
        <h2 className="text-3xl font-kumbh text-white text-center py-3">
          Connect to Server
        </h2>

        <div>
          <label
            htmlFor="serverURL"
            className="block text-sm font-kumbh text-white mb-1"
          >
            Server IP
          </label>
          <input
            id="serverURL"
            type="text"
            placeholder="e.g. 192.168.1.10"
            value={serverIP}
            onChange={(e) => setServerIP(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 font-kumbh focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="rememberServer"
            type="checkbox"
            checked={rememberServer}
            onChange={(e) => setRememberServer(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="rememberServer"
            className="text-sm font-kumbh text-white"
          >
            Remember Server
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 text-white py-2 font-kumbh text-sm hover:bg-blue-700 transition cursor-pointer"
        >
          Connect
        </button>
      </form>
    </main>
  );
}
