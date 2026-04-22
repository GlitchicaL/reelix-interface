"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  async function registerHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
      return;
    }

    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center">
      <div>
        <h1 className="text-4xl font-kumbh font-bold text-white text-center pt-12">
          Welcome To <span className="font-carter font-normal">Reelix!</span>
        </h1>
      </div>

      <form onSubmit={(e) => registerHandler(e)} className="p-6 space-y-4">
        <h2 className="text-3xl font-kumbh text-white text-center py-3">
          Register
        </h2>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-kumbh text-white mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 font-kumbh focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-kumbh text-white mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 font-kumbh focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 text-white py-2 font-kumbh text-sm hover:bg-blue-700 transition cursor-pointer"
        >
          Create
        </button>
      </form>
    </main>
  );
}
