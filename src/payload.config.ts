import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { BlocksFeature, CodeBlock, lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";
import { Messages } from "./payload/collections/Messages";
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
  collections: [Posts, Media, Messages, Users],
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
  // Email is optional: without SMTP settings, contact messages are only stored in the dashboard.
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER || "",
          defaultFromName: "Portfolio",
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          },
        }),
      }
    : {}),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disable: true },
  telemetry: false,
});
