"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildRegisterUrl, buildLoginUrl } from "@/lib/utils";
import { API_PORT, REELIX_COOKIE_BASE_SERVER_URL, REELIX_COOKIE_AUTH_TOKEN } from "@/lib/constants";
import { User } from "@/lib/types/user";

export async function register(username: string, password: string): Promise<void> {
  const store = await cookies();

  const BASE_API_URL = store.get(REELIX_COOKIE_BASE_SERVER_URL)?.value;

  if (!BASE_API_URL) {
    redirect("/connect");
  }

  const endpoint = buildRegisterUrl(BASE_API_URL, API_PORT);
  const res = await sendRequest(endpoint, username, password);

  if (!res.ok) {
    throw new Error("Failed to register user");
  }
}

export async function login(username: string, password: string): Promise<User> {
  const store = await cookies();

  const BASE_API_URL = store.get(REELIX_COOKIE_AUTH_TOKEN)?.value;
  const MAX_AGE = 60 * 60 * 24 * 30;

  if (!BASE_API_URL) {
    redirect("/connect");
  }

  const endpoint = buildLoginUrl(BASE_API_URL, API_PORT);
  const res = await sendRequest(endpoint, username, password);

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  const user: User = await res.json();

  (await cookies()).set(REELIX_COOKIE_AUTH_TOKEN, user.token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: MAX_AGE,
  });

  return user;
}

async function sendRequest(endpoint: string, username: string, password: string): Promise<Response> {
  return await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
}