import Image from "next/image";
import Link from "next/link";

/**
 * Dark masthead used at the top of every inner page. Built from type, the
 * halftone brand texture and the crest as a watermark rather than the old
 * site's stock photography — see README, "Before go-live".
 */
export default function PageBanner({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="texture relative isolate overflow-hidden bg-ink">
      {/* Gold wash bleeding in from the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,216,45,0.14),transparent_65%)]"
      />
      {/* Crest watermark */}
      <Image
        src="/images/logo.png"
        alt=""
        width={712}
        height={192}
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[-3rem] w-[28rem] max-w-none opacity-[0.06] select-none sm:opacity-[0.08]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-2 font-ui text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white/70">{eyebrow}</li>
          </ol>
        </nav>

        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-white">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg text-white/70">{intro}</p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="h-1 bg-gradient-to-r from-red via-gold to-red"
      />
    </section>
  );
}
