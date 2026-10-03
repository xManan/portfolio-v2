import { notFound } from "next/navigation";

// Sends unknown URLs to the site's own 404 page (styled like the rest of the site).
export default function Missing() {
  notFound();
}
