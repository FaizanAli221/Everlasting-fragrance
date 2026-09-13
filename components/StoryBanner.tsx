import Image from "next/image";
import Link from "next/link";

export default function StoryBanner() {
  return (
    <section
      id="story"
      className="relative flex min-h-[480px] sm:min-h-[560px] items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/products/trio-banner.jpg"
          alt="Everlast Fragrances Master Collection"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-parchment">
        <p className="text-[11px] font-semibold tracking-widest2 text-goldLight uppercase">
          Master Perfumery · Extrait Concentration
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl italic leading-tight">
          Unforgettable Sillage. Unrivaled Longevity.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-parchment/80 sm:text-base">
          Formulated with over 25% pure essential perfume oils. Crafted to turn heads and outlast the longest days.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="border border-gold bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-goldLight"
          >
            Explore The Collection
          </Link>
          <Link
            href="/about"
            className="border border-parchment/40 bg-black/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-parchment backdrop-blur-xs transition-colors hover:bg-parchment hover:text-ink"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
