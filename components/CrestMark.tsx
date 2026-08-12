/**
 * Decorative shield motif.
 *
 * The only logo asset is the full lockup (shield + wordmark) at 721×200.
 * Scaling that up as a watermark crops it mid-word, which reads as broken
 * text rather than decoration — so this shows the shield alone by anchoring
 * the bitmap left inside a box cut to the shield's aspect ratio.
 */
export default function CrestMark({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{
        aspectRatio: "13 / 20",
        backgroundImage: "url(/images/logo.png)",
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        opacity,
      }}
    />
  );
}
