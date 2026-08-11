import Image from "next/image";

export default function PageBanner({
  title,
  intro,
  image,
}: {
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative isolate bg-ink">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h1 className="rule text-white">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
