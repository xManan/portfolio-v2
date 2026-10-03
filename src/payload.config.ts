import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { BlocksFeature, CodeBlock, lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Settings } from "./payload/globals/Settings";
import { Home } from "./payload/globals/Home";

const dirname = path.dirname(fileURLToPath(import.meta.url));

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
      BlocksFeature({ blocks: [CodeBlock({ defaultLanguage: "ts" })] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./data/site.db" },
    // Schema changes go through migrations (src/migrations) so dev and prod stay identical.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
    wal: true,
    busyTimeout: 5000,
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
});
