import type { GlobalConfig } from "payload";
import { revalidateSite } from "../revalidate";

export const Settings: GlobalConfig = {
  slug: "settings",
  label: "Site settings",
  admin: { group: "Content", description: "Your name, the opening quote, the hero and the contact section." },
  access: { read: () => true },
  hooks: { afterChange: [() => revalidateSite()] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "You",
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, admin: { width: "50%" } },
                { name: "firstName", label: "First name", type: "text", required: true, admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "role", type: "text", required: true, admin: { width: "50%", description: "e.g. Backend engineer" } },
                { name: "location", type: "text", admin: { width: "50%", description: "Shown on your photo in the hero and in the footer." } },
              ],
            },
            {
              name: "portrait",
              label: "Profile photo",
              type: "upload",
              relationTo: "media",
              admin: {
                description:
                  "Shown in the hero. A portrait (taller than wide, about 4:5) with your face near the top third works best. Until you add one, a gradient placeholder is shown.",
              },
            },
            { name: "email", type: "email", required: true },
            {
              name: "socials",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              admin: { initCollapsed: true },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "35%" } },
                    { name: "href", label: "URL", type: "text", required: true, admin: { width: "65%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Opening quote",
          name: "quote",
          fields: [
            { name: "text", type: "textarea", required: true, admin: { description: "Keep it short. It's written in word by word." } },
            { name: "author", type: "text", required: true },
          ],
        },
        {
          label: "Hero",
          name: "hero",
          fields: [
            { name: "greeting", type: "text", required: true },
            { name: "headline", type: "text", required: true, admin: { description: "About 40 characters fits two lines on desktop." } },
            { name: "intro", type: "textarea", required: true, admin: { description: "20 words or fewer." } },
          ],
        },
        {
          label: "Contact",
          name: "contact",
          fields: [
            { name: "heading", type: "text", required: true },
            { name: "body", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};
