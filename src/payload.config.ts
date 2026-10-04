import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { BlocksFeature, CodeBlock, lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Settings } from "./payload/globals/Settings";
import { Home } from "./payload/globals/Home";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const databaseUrl = process.env.DATABASE_URI || "file:./data/site.db";
// A local SQLite file (VPS, your laptop) vs a hosted libSQL database (Turso, for Vercel).
const localDb = databaseUrl.startsWith("file:");

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " | Portfolio dashboard" },
    avatar: "default",
  },
  collections: [Posts, Media, Users],
  globals: [Settings, Home],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [CodeBlock({ defaultLanguage: "typescript" })] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: databaseUrl, authToken: process.env.DATABASE_AUTH_TOKEN || undefined },
    // Schema changes go through migrations (src/migrations) so dev and prod stay identical.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    // File-level settings; a hosted database manages these itself.
    ...(localDb ? { wal: true, busyTimeout: 5000 } : {}),
  }),
  plugins: [
    // On Vercel the disk doesn't persist, so uploads go to Vercel Blob instead
    // (only when its token is set; otherwise files stay in MEDIA_DIR).
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
});
