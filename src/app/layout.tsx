import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/schibsted-grotesk/index.css";
import "./globals.css";
import { person, hero } from "@/content/site";
import { SmoothScroll } from "@/components/smooth-scroll";
import { IntroProvider } from "@/components/intro-context";

export const metadata: Metadata = {
  title: { default: `${person.name}, ${person.role.toLowerCase()}`, template: `%s | ${person.name}` },
  description: hero.intro,
  openGraph: {
    title: `${person.name}, ${person.role.toLowerCase()}`,
    description: hero.intro,
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f6f5fa",
};

// Runs before first paint so returning visitors (same tab session) never see
// a flash of the intro overlay.
const introScript = `try{document.documentElement.dataset.intro=sessionStorage.getItem("intro-seen")?"seen":"play"}catch(e){document.documentElement.dataset.intro="seen"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </IntroProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
