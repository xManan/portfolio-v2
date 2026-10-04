/**
 * The site's URL prefix (BASE_PATH at build time, e.g. "/cloud-kitchen-os"),
 * or "" when it lives at the root. Next's <Link>, router and assets add it
 * automatically; use withBase() for URLs built by hand (plain <a>, image
 * sources, metadata).
 */
export const basePath = process.env.NEXT_BASE_PATH ?? "";

export const withBase = (path: string) => (path.startsWith("/") && !path.startsWith(basePath + "/") ? basePath + path : path);
