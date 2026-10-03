import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/schibsted-grotesk/index.css";
import "./globals.css";
import { getSite } from "@/lib/content";
import { Nav } from "@/components/nav";
import { ConnectProvider } from "@/components/connect";
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

// Runs before first paint. Every full load of the home page plays the intro
// from the top (the browser's restored scroll position would hide the hero it
// reveals). Other pages skip it.
const introScript = `(function(){var r=document.documentElement;if(location.pathname==="/"){r.dataset.intro="play";try{history.scrollRestoration="manual"}catch(e){}window.scrollTo(0,0)}else{r.dataset.intro="done"}})()`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { person } = await getSite();
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <IntroProvider>
          <ConnectProvider email={person.email} socials={person.socials}>
            <Nav person={person} />
            <SmoothScroll>{children}</SmoothScroll>
          </ConnectProvider>
        </IntroProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
