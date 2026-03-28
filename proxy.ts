import { NextResponse, NextRequest } from "next/server";
import { decrypt, trimUrl } from "@/lib/utils";
import { PROTECTED_ROUTES, REELIX_COOKIE_BASE_SERVER_URL, REELIX_COOKIE_AUTH_TOKEN } from "@/lib/constants";

export async function proxy(request: NextRequest) {
  const BASE_API_URL = request.cookies.get(REELIX_COOKIE_BASE_SERVER_URL)?.value;

  console.log("here")

  if (!BASE_API_URL) {
    return NextResponse.redirect(new URL('/connect', request.url));
  }

  const path = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(trimUrl(path));

  const authCookie = request.cookies.get(REELIX_COOKIE_AUTH_TOKEN)?.value;
  const session = await decrypt(authCookie);

  if (isProtectedRoute && !session?.username) {
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
  ],
}