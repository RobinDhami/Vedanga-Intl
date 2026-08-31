import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";

import sharp from "sharp";

export const MAX_IMAGE_UPLOAD_BYTES = 8 * 1024 * 1024;

const MAX_IMAGE_PIXELS = 40_000_000;
const MAX_IMAGE_DIMENSION = 1600;
const WEBP_QUALITY = 82;
const MANAGED_IMAGE_PATH = "/uploads/";

const uploadCollections = [
  "hero-slides",
  "notices",
  "news",
  "events",
  "gallery-images",
  "team-members",
  "clubs",
  "job-openings",
] as const;

export type ImageUploadCollection = (typeof uploadCollections)[number];

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedImageFormats = new Set(["jpeg", "png", "webp"]);

export function isImageUploadCollection(value: string): value is ImageUploadCollection {
  return uploadCollections.includes(value as ImageUploadCollection);
}

function getUploadRoot() {
  const configured = process.env.CMS_UPLOAD_DIR?.trim();
  return path.resolve(configured || path.join(process.cwd(), "uploads"));
}

function resolveManagedPath(relativePath: string) {
  const uploadRoot = getUploadRoot();
  const resolved = path.resolve(uploadRoot, relativePath);
  if (resolved !== uploadRoot && !resolved.startsWith(`${uploadRoot}${path.sep}`)) {
    return null;
  }
  return resolved;
}

export function buildManagedImageUrl(origin: string, relativePath: string) {
  const configured = process.env.CMS_UPLOAD_PUBLIC_URL?.trim().replace(/\/$/, "");
  const baseUrl = configured || `${origin.replace(/\/$/, "")}${MANAGED_IMAGE_PATH.slice(0, -1)}`;
  return `${baseUrl}/${relativePath.replace(/\\/g, "/")}`;
}

export async function storeUploadedImage(file: File, collection: ImageUploadCollection) {
  if (file.type && file.type !== "application/octet-stream" && !allowedMimeTypes.has(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP images are supported.");
  }

  if (file.size <= 0 || file.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new Error("Images must be no larger than 8 MB.");
  }

  const input = Buffer.from(await file.arrayBuffer());
  const transformer = sharp(input, {
    failOn: "error",
    limitInputPixels: MAX_IMAGE_PIXELS,
    sequentialRead: true,
  });
  const metadata = await transformer.metadata();
  if (!metadata.format || !allowedImageFormats.has(metadata.format)) {
    throw new Error("Only JPEG, PNG, and WebP images are supported.");
  }

  const output = await transformer
    .rotate()
    .resize({
      width: MAX_IMAGE_DIMENSION,
      height: MAX_IMAGE_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, smartSubsample: true })
    .toBuffer();

  const filename = `${Date.now()}-${randomUUID()}.webp`;
  const relativePath = path.join(collection, filename);
  const outputPath = resolveManagedPath(relativePath);
  if (!outputPath) {
    throw new Error("The upload destination is invalid.");
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, { flag: "wx" });

  return {
    relativePath,
    size: output.length,
  };
}

export async function readManagedImage(pathSegments: string[]) {
  if (pathSegments.length !== 2 || !isImageUploadCollection(pathSegments[0])) {
    return null;
  }

  const filename = pathSegments[1];
  if (!/^[0-9]+-[0-9a-f-]+\.webp$/i.test(filename)) {
    return null;
  }

  const resolved = resolveManagedPath(path.join(pathSegments[0], filename));
  if (!resolved) {
    return null;
  }

  return readFile(resolved).catch(() => null);
}

export async function deleteManagedImage(imageUrl: string | null | undefined) {
  if (!imageUrl) return;

  let pathname: string;
  try {
    pathname = imageUrl.startsWith("http") ? new URL(imageUrl).pathname : imageUrl;
  } catch {
    return;
  }

  const markerIndex = pathname.indexOf(MANAGED_IMAGE_PATH);
  if (markerIndex < 0) return;

  const pathSegments = pathname
    .slice(markerIndex + MANAGED_IMAGE_PATH.length)
    .split("/")
    .filter(Boolean);
  if (pathSegments.length !== 2 || !isImageUploadCollection(pathSegments[0])) return;
  if (!/^[0-9]+-[0-9a-f-]+\.webp$/i.test(pathSegments[1])) return;

  const resolved = resolveManagedPath(path.join(pathSegments[0], pathSegments[1]));
  if (!resolved) return;
  await unlink(resolved).catch(() => undefined);
}
