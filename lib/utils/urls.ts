import { getFullIndex } from "../utils";

export type AssetType = "cover" | "thumbnail" | "backdrop";

export const BASE_API_PATH = "api";
export const BASE_CDN_PATH = "cdn/vaults";

/**
 * Trim the URL for pattern matching (ex. /collection/1 -> /collection/)
 * @param url The URL to trim
 * @returns The trimmed URL
 */
export function trimUrl(url: string): string {
  if (url === "/") {
    return "/";
  }

  const parts = url.split("/");
  return `\/${parts[1]}\/`;
}

export function buildBaseApiServerUrl(
  serverUrl: string,
  serverPort: number,
  basePath: string
): string {
  return `${serverUrl}:${serverPort}/${basePath}`;
}

export function buildCdnPath(
  serverUrl: string,
  serverPort: number,
  basePath: string
): string {
  return `${serverUrl}:${serverPort}/${basePath}`;
}

export function buildCollectionUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  collectionName: string,
): string {
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/collections/${collectionName}/cover.jpg`);
}

export function buildGalleryUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  gallerySlug: string,
  index: number,
): string {
  const fullIndex = getFullIndex(index);
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/pictures/${gallerySlug}/${fullIndex}.jpg`);
}

export function buildActorUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  actorSlug: string
): string {
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/pictures/actors/${actorSlug}.jpg`);
}

export function buildBackdropUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  collectionName: string,
  videoSlug: string
): string {
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/collections/${collectionName}/${videoSlug}/backdrop.jpg`);
}

export function buildThumbnailUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  collectionName: string,
  videoSlug: string
): string {
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/collections/${collectionName}/${videoSlug}/thumbnail.jpg`);
}

export function buildVideoUrl(
  serverUrl: string,
  serverPort: number,
  vaultName: string,
  collectionName: string,
  videoSlug: string
): string {
  return buildCdnPath(serverUrl, serverPort, `${BASE_CDN_PATH}/${vaultName}/collections/${collectionName}/${videoSlug}/${videoSlug}.mp4`);
}