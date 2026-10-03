import type { CollectionConfig } from "payload";
import { revalidateSite } from "../revalidate";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Writing" },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "_status"],
    description: "Articles shown under Writing. Save as draft to hide one; publish to make it live.",
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  versions: { drafts: true },
  defaultSort: "-date",
  hooks: {
    afterChange: [() => revalidateSite()],
    afterDelete: [() => revalidateSite()],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Used in the URL. Leave empty to generate it from the title." },
      hooks: {
        beforeValidate: [({ value, data }) => (value ? slugify(value) : data?.title ? slugify(data.title) : value)],
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "tags",
      type: "text",
      admin: { position: "sidebar", description: "Comma separated, e.g. engineering, people" },
    },
    { name: "summary", type: "textarea", required: true, admin: { description: "One or two sentences shown in lists." } },
    { name: "content", type: "richText", required: true },
  ],
};
