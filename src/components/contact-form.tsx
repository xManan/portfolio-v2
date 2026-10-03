"use client";

import { createContext, useActionState, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { sendMessage, type ContactState } from "@/app/(site)/actions";
import { Mesh } from "./mesh";
import { EASE } from "./ui";

type OpenOptions = { context?: string };
type Ctx = { open: (opts?: OpenOptions) => void };

const ContactContext = createContext<Ctx>({ open: () => {} });
export const useContact = () => useContext(ContactContext);

/** Provides `useContact().open()` and renders the contact dialog once for the whole site. */
export function ContactProvider({ firstName, children }: { firstName: string; children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context?: string; key: number }>({ open: false, key: 0 });
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((opts?: OpenOptions) => {
    opener.current = document.activeElement as HTMLElement | null;
    setState((s) => ({ open: true, context: opts?.context, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    // Return focus to whatever opened the dialog.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {state.open && <Dialog key={state.key} firstName={firstName} context={state.context} onClose={close} />}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}

/** A button that opens the contact form. */
export function ContactButton({
  children = "Contact me",
  className,
  context,
}: {
  children?: React.ReactNode;
  className?: string;
  context?: string;
}) {
  const { open } = useContact();
  return (
    <button type="button" onClick={() => open({ context })} className={className} aria-haspopup="dialog">
      {children}
    </button>
  );
}

function Field({
  label,
  error,
  children,
  id,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#c2410c]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-[14px] bg-canvas px-4 py-3 text-base text-ink ring-1 ring-line transition-[box-shadow,background-color] duration-200 placeholder:text-soft/70 hover:ring-ink/25 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-purple aria-[invalid=true]:ring-[#c2410c]";

function Dialog({ firstName, context, onClose }: { firstName: string; context?: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: "idle" });
  const [startedAt] = useState(() => Date.now());
  const sent = state.status === "sent";
  const fields = state.status === "error" ? state.fields ?? {} : {};

  // Lock page scroll, close on Escape, keep Tab inside the dialog.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("input[name=name]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const els = panel.current.querySelectorAll<HTMLElement>("button, input, textarea, a[href]");
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Move focus to the first invalid field after a failed submit.
  useEffect(() => {
    if (state.status !== "error") return;
    const first = (["name", "email", "message"] as const).find((f) => state.fields?.[f]);
    if (first) panel.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div aria-hidden className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        data-lenis-prevent
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[var(--radius-card)] bg-surface shadow-[0_40px_80px_-30px_rgb(26_21_48/0.5)] md:max-w-[560px] md:rounded-[var(--radius-card)]"
        initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 24, opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: [0.55, 0, 1, 0.45] } }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="relative overflow-hidden px-7 pb-7 pt-8 md:px-9">
          <Mesh preset="brand" />
          <div className="relative z-[2] pr-10">
            <h2 id={`${id}-title`} className="font-display text-[32px] font-semibold leading-tight tracking-[-0.035em] text-white">
              {sent ? "Message sent" : `Say hello to ${firstName}`}
            </h2>
            <p className="mt-2 text-white/85">
              {sent ? "Thanks for reaching out." : "A role, a project, or just a backend question. I read every message."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-[3] grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
            <XIcon size={18} weight="bold" />
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="sent"
              className="flex flex-col items-center px-7 pb-10 pt-10 text-center md:px-9"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <motion.span
                className="grid h-16 w-16 place-items-center rounded-full bg-purple text-white"
                initial={reduce ? false : { scale: 0.4 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                <CheckIcon size={30} weight="bold" />
              </motion.span>
              <p className="mt-6 max-w-[32ch] text-lg leading-relaxed">
                Thanks, {state.name.split(" ")[0]}. I&rsquo;ll reply to you by email, usually within a couple of days.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 rounded-full bg-ink px-6 py-3 font-medium text-canvas transition-colors hover:bg-purple"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              action={action}
              noValidate
              className="grid gap-5 px-7 pb-8 pt-7 md:px-9"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={`${id}-name`} label="Name" error={fields.name}>
                  <input
                    id={`${id}-name`}
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    aria-invalid={Boolean(fields.name)}
                    aria-describedby={fields.name ? `${id}-name-error` : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field id={`${id}-email`} label="Email" error={fields.email}>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(fields.email)}
                    aria-describedby={fields.email ? `${id}-email-error` : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field id={`${id}-message`} label="Message" error={fields.message}>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={5}
                  required
                  maxLength={5000}
                  defaultValue={context ? `About “${context}”: ` : undefined}
                  aria-invalid={Boolean(fields.message)}
                  aria-describedby={fields.message ? `${id}-message-error` : undefined}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {/* Spam traps */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <input type="hidden" name="startedAt" value={startedAt} />
              {context && <input type="hidden" name="context" value={context} />}

              {state.status === "error" && !Object.keys(fields).length && (
                <p role="alert" className="rounded-[14px] bg-[#fff1e8] px-4 py-3 text-sm text-[#9a3412]">
                  {state.message}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-sm text-soft">I&rsquo;ll only use your email to reply.</p>
                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-medium text-canvas transition-[background-color,transform] duration-200 hover:bg-purple active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                >
                  {pending ? "Sending..." : "Send message"}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-canvas/15 transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRightIcon size={16} weight="bold" />
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
