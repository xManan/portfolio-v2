import type { CollectionConfig } from "payload";

/**
 * Messages sent through the site's contact form. Created only by the server
 * action in src/app/(site)/actions.ts; never writable from the public API.
 */
export const Messages: CollectionConfig = {
  slug: "messages",
  labels: { singular: "Message", plural: "Inbox" },
  admin: {
    group: "Inbox",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "createdAt", "read"],
    description: "Messages from the contact form, newest first.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "context", type: "text", admin: { description: "Where it was sent from, e.g. an article title." } },
    { name: "read", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Optional: email the owner when a message arrives (only if SMTP is configured).
        if (operation !== "create" || !process.env.SMTP_HOST || !process.env.CONTACT_NOTIFY_TO) return doc;
        try {
          await req.payload.sendEmail({
            to: process.env.CONTACT_NOTIFY_TO,
            replyTo: doc.email,
            subject: `New message from ${doc.name}${doc.context ? ` (re: ${doc.context})` : ""}`,
            text: `${doc.message}\n\nFrom: ${doc.name} <${doc.email}>`,
          });
        } catch (err) {
          req.payload.logger.error({ err }, "Could not send contact notification");
        }
        return doc;
      },
    ],
  },
};
