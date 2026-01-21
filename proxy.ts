import { NextResponse, NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const BASE_API_URL = request.cookies.get('reelix_base_server_url')?.value;

  if (!BASE_API_URL) {
    return NextResponse.redirect(new URL('/connect', request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/actors/:vaultId",
    "/collections/:vaultId",
    "/galleries/:vaultId",
    "/gallery/:galleryId",
    "/video/:videoId",
    "/videos/:collectionId",
  ],
}