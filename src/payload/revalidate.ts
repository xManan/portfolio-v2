import { revalidatePath } from "next/cache";

/**
 * Every page is statically rendered and cached. When content changes in the
 * dashboard, throw the cached HTML away so the next visitor gets a fresh render.
 * Outside a running Next.js server (seed scripts, migrations) there is nothing
 * to purge, so errors are ignored.
 */
export function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Not running inside Next.js.
  }
}
