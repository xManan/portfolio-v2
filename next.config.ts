import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

/**
 * Optional prefix the whole site lives under, e.g. BASE_PATH=/cloud-kitchen-os
 * serves the portfolio at /cloud-kitchen-os, the dashboard at
 * /cloud-kitchen-os/admin and so on. Read at build time. Empty = site at /.
 */
const basePath = (process.env.BASE_PATH ?? "").trim().replace(/\/+$/, "").replace(/^(?=[^/])/, "/");

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  images: {
    localPatterns: [{ pathname: `${basePath}/api/media/file/**` }],
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  // With a prefix, send visitors who land on the bare domain to the site.
  ...(basePath
    ? { redirects: async () => [{ source: "/", destination: basePath, basePath: false as const, permanent: false }] }
    : {}),
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
