"use server";

import { cookies } from "next/headers";

import { API_PORT, REELIX_COOKIE_BASE_SERVER_URL } from "@/lib/constants";

export async function setBaseServerURL(ip: string, remember: boolean) {
  const BASE_URL = ip.startsWith("http://") ? ip : `http://${ip}`;
  const API_STATUS_URL = `${BASE_URL}:${API_PORT}/api/status`;

  const response = await fetch(API_STATUS_URL);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Error connecting to server.");
  }

  const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

  (await cookies()).set(REELIX_COOKIE_BASE_SERVER_URL, BASE_URL, {
    httpOnly: false,
    path: '/',
    sameSite: 'lax',
    maxAge: remember ? MAX_AGE : undefined,
  });
}
