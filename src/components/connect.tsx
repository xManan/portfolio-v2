"use client";

import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRightIcon,
  ButterflyIcon,
  CheckIcon,
  CopyIcon,
  DevToLogoIcon,
  DiscordLogoIcon,
  DribbbleLogoIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MastodonLogoIcon,
  MediumLogoIcon,
  StackOverflowLogoIcon,
  TelegramLogoIcon,
  ThreadsLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
  type Icon,
} from "@phosphor-icons/react";
import { EASE } from "./ui";

type Social = { label: string; href: string };
type Links = { email: string; socials: Social[] };

const LinksContext = createContext<Links>({ email: "", socials: [] });

/** Makes the socials from the dashboard available to every "Connect" button. */
export function ConnectProvider({ email, socials, children }: Links & { children: React.ReactNode }) {
  return <LinksContext.Provider value={{ email, socials }}>{children}</LinksContext.Provider>;
}

export const useLinks = () => useContext(LinksContext);

const ICONS: [RegExp, Icon][] = [
  [/github\./, GithubLogoIcon],
  [/linkedin\./, LinkedinLogoIcon],
  [/(twitter|x)\.com/, XLogoIcon],
  [/instagram\./, InstagramLogoIcon],
  [/bsky\./, ButterflyIcon],
  [/threads\./, ThreadsLogoIcon],
  [/mastodon|hachyderm|fosstodon/, MastodonLogoIcon],
  [/medium\./, MediumLogoIcon],
  [/dev\.to/, DevToLogoIcon],
  [/stackoverflow\./, StackOverflowLogoIcon],
  [/dribbble\./, DribbbleLogoIcon],
  [/youtube\.|youtu\.be/, YoutubeLogoIcon],
  [/t\.me|telegram\./, TelegramLogoIcon],
  [/discord\./, DiscordLogoIcon],
];

export function socialIcon(href: string): Icon {
  return ICONS.find(([re]) => re.test(href))?.[1] ?? GlobeIcon;
}

function host(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

type Place = { top: number; left: number; origin: string; sheet: boolean };

/**
 * A button that opens a small card with every social link and a copy-email row.
 * Desktop: a popover anchored to the button. Phones: a sheet from the bottom.
 */
export function ConnectButton({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className={className}
      >
        {children}
      </button>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>{open && <Card id={id} trigger={trigger} align={align} onClose={close} />}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}

const WIDTH = 320;
const GAP = 12;

function Card({
  id,
  trigger,
  align,
  onClose,
}: {
  id: string;
  trigger: React.RefObject<HTMLButtonElement | null>;
  align: "start" | "center" | "end";
  onClose: (refocus?: boolean) => void;
}) {
  const { email, socials } = useLinks();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [copied, setCopied] = useState(false);

  // Anchor to the button, flipping above it when there is no room below.
  useLayoutEffect(() => {
    const update = () => {
      const t = trigger.current?.getBoundingClientRect();
      if (!t) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 640) return setPlace({ top: 0, left: 0, origin: "bottom", sheet: true });
      const h = panel.current?.offsetHeight ?? 300;
      const below = t.bottom + GAP + h <= vh - 16 || t.top - GAP - h < 16;
      const x = align === "start" ? t.left : align === "end" ? t.right - WIDTH : t.left + t.width / 2 - WIDTH / 2;
      const left = Math.min(Math.max(16, x), vw - WIDTH - 16);
      setPlace({
        top: below ? t.bottom + GAP : t.top - GAP - h,
        left,
        origin: `${t.left + t.width / 2 - left}px ${below ? "top" : "bottom"}`,
        sheet: false,
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [trigger, align]);

  // Close on Escape or a click outside; focus the first link.
  useEffect(() => {
    panel.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: PointerEvent) => {
      const n = e.target as Node;
      if (!panel.current?.contains(n) && !trigger.current?.contains(n)) onClose(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [onClose, trigger]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy my email address:", email);
    }
  };

  const sheet = place?.sheet;
  const from = reduce ? { opacity: 0 } : sheet ? { y: "100%" } : { opacity: 0, scale: 0.94, y: -4 };

  return (
    <>
      {sheet && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <motion.div
        ref={panel}
        id={id}
        role="dialog"
        aria-label="Find me online"
        data-lenis-prevent
        style={
          sheet
            ? undefined
            : { top: place?.top ?? -9999, left: place?.left ?? -9999, width: WIDTH, transformOrigin: place?.origin }
        }
        className={`fixed z-[81] bg-surface p-2 ring-1 ring-line shadow-[0_30px_60px_-25px_rgb(26_21_48/0.45)] ${
          sheet ? "inset-x-0 bottom-0 rounded-t-[var(--radius-card)] px-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3" : "rounded-[var(--radius-inner)]"
        }`}
        initial={from}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ ...from, transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] } }}
        transition={sheet ? { duration: 0.45, ease: EASE } : { duration: 0.28, ease: EASE }}
      >
        {sheet && <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />}
        <p className="px-3 pb-2 pt-1 text-sm text-soft">Find me online</p>
        <ul>
          {socials.map((s, i) => {
            const SocialIcon = socialIcon(s.href);
            return (
              <motion.li
                key={s.href}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease: EASE }}
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-[14px] px-3 py-2.5 outline-none transition-colors duration-150 hover:bg-mist focus-visible:bg-mist"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-canvas transition-colors duration-200 group-hover:bg-purple">
                    <SocialIcon size={19} weight="fill" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-tight">{s.label}</span>
                    <span className="block truncate text-sm text-soft">{host(s.href)}</span>
                  </span>
                  <ArrowUpRightIcon
                    size={16}
                    weight="bold"
                    className="text-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple"
                  />
                </a>
              </motion.li>
            );
          })}
        </ul>
        {email && socials.length > 0 && <div aria-hidden className="mx-3 my-1 h-px bg-line" />}
        {email && (
          <motion.button
            type="button"
            onClick={copy}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 + socials.length * 0.04, duration: 0.35, ease: EASE }}
            className="group flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left outline-none transition-colors duration-150 hover:bg-mist focus-visible:bg-mist"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mist text-ink">
              <EnvelopeSimpleIcon size={19} weight="bold" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium leading-tight">{copied ? "Copied to clipboard" : "Copy my email"}</span>
              <span className="block truncate text-sm text-soft">{email}</span>
            </span>
            {copied ? (
              <CheckIcon size={16} weight="bold" className="text-purple" />
            ) : (
              <CopyIcon size={16} weight="bold" className="text-soft group-hover:text-purple" />
            )}
          </motion.button>
        )}
      </motion.div>
    </>
  );
}
