import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">404 · not found</p>
      <h1 className="mt-6 font-serif text-[clamp(3rem,8vw,7rem)] italic leading-none">This page took a day off.</h1>
      <Link href="/" className="mt-10 rounded-full border border-line px-5 py-2.5 text-sm hover:border-ember">
        Take me home →
      </Link>
    </main>
  );
}
