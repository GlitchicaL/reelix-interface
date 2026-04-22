import { NextResponse, NextRequest } from "next/server";
import { trimUrl } from "@/lib/utils";
import { PROTECTED_ROUTES, API_PORT, REELIX_COOKIE_BASE_SERVER_URL, REELIX_COOKIE_AUTH_TOKEN } from "@/lib/constants";

export async function proxy(request: NextRequest) {
  const BASE_API_URL = request.cookies.get(REELIX_COOKIE_BASE_SERVER_URL)?.value;

  if (!BASE_API_URL) {
    return NextResponse.redirect(new URL('/connect', request.url));
  }

  const path = request.nextUrl.pathname;

  // We need to rewrite API requests to avoid CORS and allow the
  // backend to set cookies. Using rewrites in the next.config.ts 
  // is not ideal as the base server URL can change and is stored
  // through cookies, thus it is done through here. 

  if (path.startsWith("/api/")) {
    const url = `${BASE_API_URL}:${API_PORT}${path}`;
    return NextResponse.rewrite(new URL(url));
  }

  const isProtectedRoute = PROTECTED_ROUTES.includes(trimUrl(path));
  const authCookie = request.cookies.get(REELIX_COOKIE_AUTH_TOKEN)?.value;

  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/actors/:vaultId",
    "/collections/:vaultId",
    "/galleries/:vaultId",
    "/gallery/:galleryId",
    "/video/:videoId",
    "/videos/:collectionId",
    "/api/:path*",
  ],
}