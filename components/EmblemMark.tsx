import Image from "next/image";

/**
 * The emblem, used as a decorative watermark on dark sections.
 *
 * The supplied emblem asset is a square navy chip with the monogram centred
 * and its corners rounded away. Dropping the opacity on that chip over a navy
 * ground leaves the panel invisible and the monogram faint, which is exactly
 * the watermark the guidelines allow — the mark is never recoloured, cropped
 * or rebuilt, only faded.
 */
export default function EmblemMark({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute aspect-square select-none ${className}`}
      style={{ opacity }}
    >
      <Image
        src="/brand/emblem.png"
        alt=""
        width={495}
        height={495}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
