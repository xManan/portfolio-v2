import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/schibsted-grotesk/index.css";
import "./globals.css";
import { getSite } from "@/lib/content";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { IntroProvider } from "@/components/intro-context";

export async function generateMetadata(): Promise<Metadata> {
  const { person, hero } = await getSite();
  const title = `${person.name}, ${person.role.toLowerCase()}`;
  return {
    title: { default: title, template: `%s | ${person.name}` },
    description: hero.intro,
    openGraph: { title, description: hero.intro, type: "website" },
    icons: { icon: "/icon.svg" },
    metadataBase: process.env.NEXT_PUBLIC_SERVER_URL ? new URL(process.env.NEXT_PUBLIC_SERVER_URL) : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f5fa",
};

// Runs before first paint so returning visitors (same tab session) never see
// a flash of the intro overlay.
const introScript = `try{document.documentElement.dataset.intro=sessionStorage.getItem("intro-seen")?"seen":"play"}catch(e){document.documentElement.dataset.intro="seen"}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { person } = await getSite();
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroProvider>
          <Nav person={person} />
          <SmoothScroll>{children}</SmoothScroll>
        </IntroProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
