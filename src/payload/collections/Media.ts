import type { CollectionConfig } from "payload";
import { revalidateSite } from "../revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [{ name: "alt", label: "Alt text", type: "text", required: true }],
  upload: {
    // Media lives on disk next to the database (see deploy/README.md).
    staticDir: process.env.MEDIA_DIR || "media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "card", width: 800 },
      { name: "large", width: 1600 },
    ],
  },
};
