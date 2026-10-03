import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="text-soft">Error 404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-none tracking-[-0.04em]">This page doesn&rsquo;t exist.</h1>
      <Link href="/" className="mt-10 rounded-full bg-ink px-6 py-3 font-medium text-canvas hover:bg-orchid">
        Go to the home page
      </Link>
    </main>
  );
}
