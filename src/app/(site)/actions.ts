"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

export type ContactState =
  | { status: "idle" }
  | { status: "sent"; name: string }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "message", string>> };

// Simple in-memory rate limit: fine for a single-process VPS deployment.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const context = String(form.get("context") ?? "").trim().slice(0, 200);

  // Spam traps: a hidden field people never fill, and bots that submit instantly.
  const startedAt = Number(form.get("startedAt") ?? 0);
  if (String(form.get("company") ?? "") || (startedAt && Date.now() - startedAt < 1500)) {
    return { status: "sent", name: name || "there" };
  }

  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  if (!name) fields.name = "Add your name so I know who to reply to.";
  else if (name.length > 100) fields.name = "Keep your name under 100 characters.";
  if (!EMAIL.test(email)) fields.email = "Enter an email address like you@example.com.";
  if (message.length < 10) fields.message = "Write at least a sentence (10 characters).";
  else if (message.length > 5000) fields.message = "Keep it under 5,000 characters.";
  if (Object.keys(fields).length) return { status: "error", message: "Check the highlighted fields.", fields };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return { status: "error", message: "That's a lot of messages in a short time. Try again in a few minutes." };
  }

  try {
    const payload = await getPayload({ config });
    await payload.create({ collection: "messages", data: { name, email, message, context: context || undefined } });
    return { status: "sent", name };
  } catch (err) {
    console.error("Contact form failed", err);
    return { status: "error", message: "Your message didn't send because of a problem on my side. Try again in a minute." };
  }
}
