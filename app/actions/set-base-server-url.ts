"use server";

import { cookies } from "next/headers";

import { DEFAULT_API_PORT, REELIX_COOKIE_BASE_SERVER_URL, REELIX_COOKIE_API_PORT } from "@/lib/constants";

export async function setBaseServerURL(ip: string, remember: boolean) {
  const BASE_URL = ip.startsWith("http://") ? ip : `http://${ip}`;

  const url = new URL(BASE_URL);
  const port = url.port || DEFAULT_API_PORT.toString();

  const API_STATUS_URL = `http://${url.hostname}:${port}/api/status`;

  const response = await fetch(API_STATUS_URL);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Error connecting to server.");
  }

  const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

  (await cookies()).set(REELIX_COOKIE_BASE_SERVER_URL, url.hostname, {
    httpOnly: false,
    path: '/',
    sameSite: 'lax',
    maxAge: remember ? MAX_AGE : undefined,
  });

  (await cookies()).set(REELIX_COOKIE_API_PORT, port, {
    httpOnly: false,
    path: '/',
    sameSite: 'lax',
    maxAge: remember ? MAX_AGE : undefined,
  });
}
