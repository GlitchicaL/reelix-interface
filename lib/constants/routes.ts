// All routes that require middleware
export const PROXY_ROUTES = [
  "/",
  "/login",
  "/register",
  "/actors/:vaultId",
  "/collections/:vaultId",
  "/galleries/:vaultId",
  "/gallery/:galleryId",
  "/video/:videoId",
  "/videos/:collectionId",
];

// All routes that require authentication
export const PROTECTED_ROUTES = [
  "/",
  "/actors/",
  "/collections/",
  "/galleries/",
  "/gallery/",
  "/video/",
  "/videos/",
];