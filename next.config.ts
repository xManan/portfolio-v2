import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/api/media/file/**" }],
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
