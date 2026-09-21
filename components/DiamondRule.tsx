/**
 * The brand's own divider: a gold hairline broken by a small lozenge.
 *
 * Taken straight off the lockup, where the same device separates the emblem
 * from the wordmark and the wordmark from the tagline. It replaced the
 * `.ledger-rule` double hairline that the previous identity used — that motif
 * belonged to the ruled-accounts-book idea, which the 2026 guidelines drop.
 */
export default function DiamondRule({
  className = "",
  width = "short",
}: {
  className?: string;
  /** `short` sits under a heading; `full` separates two sections. */
  width?: "short" | "full";
}) {
  return (
    <div
      aria-hidden="true"
      className={`diamond-rule ${width === "short" ? "max-w-[9rem]" : ""} ${className}`}
    >
      <span className="diamond-rule-dot" />
    </div>
  );
}
