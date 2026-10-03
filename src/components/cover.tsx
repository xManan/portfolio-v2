import { Mesh, type MeshPreset } from "./mesh";

const COVERS: MeshPreset[] = ["brand", "sun", "violet", "ember"];

/** A project's cover: its own image when provided, otherwise a grainy mesh gradient. */
export function Cover({ index, image, title }: { index: number; image?: string; title: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={`${title} preview`} className="h-full w-full rounded-[var(--radius-inner)] object-cover" />;
  }
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-inner)]">
      <Mesh preset={COVERS[index % COVERS.length]} />
    </div>
  );
}
