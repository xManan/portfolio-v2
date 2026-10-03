import type { Field, GlobalConfig } from "payload";
import { revalidateSite } from "../revalidate";

const heading = (defaultValue: string): Field => ({ name: "heading", type: "text", required: true, defaultValue });
const csv = (name: string, label: string, description: string): Field => ({
  name,
  label,
  type: "text",
  admin: { description },
});

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home page",
  admin: { group: "Content", description: "Every section of the home page, top to bottom. Drag items to reorder them." },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "About",
          name: "about",
          fields: [
            heading("A little about me"),
            { name: "lead", label: "Your story", type: "textarea", required: true, admin: { rows: 8 } },
            {
              name: "objects",
              label: "Things that tell your story",
              type: "array",
              maxRows: 8,
              admin: {
                description:
                  "Cut-out photos of real things from your life (transparent PNG or WebP works best). They float around your story; hovering one shows its caption. Order = the path the line draws.",
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "image", type: "upload", relationTo: "media", required: true, admin: { width: "40%" } },
                    {
                      name: "size",
                      type: "select",
                      defaultValue: "medium",
                      options: [
                        { label: "Small", value: "small" },
                        { label: "Medium", value: "medium" },
                        { label: "Large", value: "large" },
                      ],
                      admin: { width: "20%" },
                    },
                  ],
                },
                { name: "label", type: "text", required: true, admin: { description: "What it is, for screen readers. e.g. My morning chai" } },
                { name: "caption", type: "text", required: true, admin: { description: "The big line next to the image. Short and in your voice." } },
                { name: "story", type: "textarea", admin: { description: "One or two sentences under it: what this thing says about you." } },
                { name: "credit", label: "Photo credit", type: "text", admin: { description: "Only if the photo isn't yours, e.g. Photo: Jane Doe, CC BY 4.0" } },
              ],
            },
          ],
        },
        {
          label: "Principles",
          name: "principles",
          fields: [
            heading("What I believe"),
            {
              name: "items",
              label: "Principles",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "What I do",
          name: "craft",
          fields: [
            heading("What I do"),
            { name: "statement", type: "textarea", required: true },
            {
              name: "capabilities",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
                csv("items", "Tags", "Comma separated, e.g. REST and gRPC, Event-driven design"),
              ],
            },
            csv("stack", "Tool marquee", "Comma separated list of tools shown in the scrolling strip."),
          ],
        },
        {
          label: "Journey",
          name: "journey",
          fields: [
            heading("Where I’ve been"),
            {
              name: "items",
              label: "Roles (newest first)",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "period", type: "text", required: true, admin: { width: "30%", description: "e.g. 2024 - now" } },
                    { name: "role", type: "text", required: true, admin: { width: "35%" } },
                    { name: "org", label: "Company", type: "text", required: true, admin: { width: "35%" } },
                  ],
                },
                { name: "summary", type: "textarea", required: true },
                {
                  name: "highlights",
                  type: "array",
                  fields: [{ name: "text", type: "text", required: true }],
                },
              ],
            },
          ],
        },
        {
          label: "Projects",
          name: "projects",
          fields: [
            heading("Things I’ve built"),
            {
              name: "items",
              label: "Projects",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "title", type: "text", required: true, admin: { width: "40%" } },
                    { name: "kind", type: "text", required: true, admin: { width: "40%", description: "e.g. Developer tool" } },
                    { name: "year", type: "text", required: true, admin: { width: "20%" } },
                  ],
                },
                { name: "summary", type: "textarea", required: true },
                csv("stack", "Stack", "Comma separated, e.g. Go, PostgreSQL, Redis"),
                { name: "href", label: "Link", type: "text", required: true },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  admin: { description: "Optional. Without an image, a gradient cover is drawn." },
                },
              ],
            },
          ],
        },
        {
          label: "Now",
          name: "now",
          fields: [
            { name: "updated", label: "Last updated", type: "text", required: true, admin: { description: "e.g. October 2026" } },
            {
              name: "items",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "30%" } },
                    { name: "value", type: "text", required: true, admin: { width: "70%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Bookshelf",
          name: "shelf",
          fields: [
            {
              name: "books",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "title", type: "text", required: true, admin: { width: "50%" } },
                    { name: "author", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
                { name: "note", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
