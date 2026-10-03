import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` produces a fully static site in /out
  // that can be hosted anywhere (Vercel, Netlify, GitHub Pages, S3…).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
