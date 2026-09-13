import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

export const metadata: Metadata = {
  title: "Our Story & Craftsmanship | Everlast Fragrances",
  description:
    "Discover the inspiration, craftsmanship, and philosophy behind Everlast Fragrances — masterfully concentrated luxury scents created to leave a lasting impression.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-ink py-20 text-parchment sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-goldLight">
            Our Philosophy & Craft
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl italic">
            Leave a Lasting Impression.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-parchment/75 sm:text-lg">
            We believe an extraordinary fragrance shouldn’t be locked behind an
            exorbitant designer price tag. Everlast Fragrances was born to
            redefine everyday luxury in Pakistan.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <div className="space-y-8 text-ink/80 leading-relaxed">
          <div className="border-l-2 border-clay pl-6 italic font-display text-xl text-ink">
            &ldquo;Scent is the most intimate form of memory. When you walk into a room, your presence should linger with refinement and respect.&rdquo;
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-ink pt-4">
            The Everlast Standard
          </h2>

          <p>
            Most commercial colognes use diluted Eau de Toilette concentrations
            (5%–10% perfume oil), which evaporate within two to three hours in
            hot, humid climates. At Everlast Fragrances, we formulate our
            creations as <strong>Parfum / Extrait concentrations (25%–30% fragrance oils)</strong>,
            ensuring your scent retains its vibrancy, richness, and depth from
            morning meetings straight through evening celebrations.
          </p>

          <p>
            Each bottle is blended using carefully selected olfactory oils sourced
            from premier European perfumeries, balanced with clean, cosmetic-grade
            ethanol for a smooth, head-ache-free opening and warm, resonant drydown.
          </p>

          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3">
            <div className="rounded-sm border border-ink/10 bg-bone/60 p-6">
              <h3 className="font-display text-lg text-ink">Extrait Grade</h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                25%+ pure oil concentration engineered specifically to withstand humid climates and last 12+ hours on fabric.
              </p>
            </div>
            <div className="rounded-sm border border-ink/10 bg-bone/60 p-6">
              <h3 className="font-display text-lg text-ink">Master Blends</h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                From the crisp pineapple of Creed Aventus to the frosty mint of Hawas Ice, our formulas capture true designer sophistication.
              </p>
            </div>
            <div className="rounded-sm border border-ink/10 bg-bone/60 p-6">
              <h3 className="font-display text-lg text-ink">Honest Value</h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                No middleman markup, no retail overhead. Premium luxury perfumery delivered straight to your doorstep nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-ink/10 pt-12">
          <h3 className="font-display text-2xl text-ink">Find Your Signature Fragrance</h3>
          <p className="mt-2 text-sm text-ink/60">
            Browse our bestsellers with hassle-free Cash on Delivery across Pakistan.
          </p>
          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-block border border-ink bg-ink px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-parchment hover:bg-ink/85 transition-colors"
            >
              Shop Best Sellers
            </Link>
          </div>
        </div>
      </section>

      <Features />
      <Footer />
    </main>
  );
}
