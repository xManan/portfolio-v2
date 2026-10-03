import { Bloom } from "./bloom";

const COVERS = [
  "linear-gradient(135deg, #f7cddf, #d8cbf5)",
  "linear-gradient(135deg, #f7ebc0, #f7cddf)",
  "linear-gradient(135deg, #ccd9f6, #d8cbf5)",
  "linear-gradient(135deg, #d8cbf5, #f7ebc0)",
];

/** A project's cover: its own image when provided, otherwise a grainy gradient with a small bloom. */
export function Cover({ index, image, title }: { index: number; image?: string; title: string }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={`${title} preview`} className="h-full w-full rounded-[var(--radius-inner)] object-cover" />;
  }
  return (
    <div className="grainy relative h-full w-full overflow-hidden rounded-[var(--radius-inner)]" style={{ background: COVERS[index % COVERS.length] }}>
      <div className="absolute -bottom-[30%] -right-[12%] w-[70%] opacity-90" style={{ transform: `rotate(${index * 17}deg)` }}>
        <Bloom />
      </div>
    </div>
  );
}
