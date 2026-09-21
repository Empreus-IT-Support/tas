/**
 * The double gold frame from the cover of the brand guidelines, at section
 * scale. Inset from the section edge, purely decorative.
 *
 * It has to be a real element rather than a class on the section, because
 * `.texture` and `.vignette` already use that section's `::before` and
 * `::after`. Two classes reaching for one pseudo-element is a silent failure —
 * one just never renders.
 *
 * The parent section needs `relative` (or `isolate`) for this to anchor to.
 */
export default function PageFrame() {
  return <div aria-hidden="true" className="page-frame" />;
}
