import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Everlast Fragrances",
  description: "Terms and conditions governing purchases and site usage on Everlast Fragrances.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-ink/50">Last updated: September 2026</p>

        <div className="mt-8 space-y-6 text-sm text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-ink">1. Overview</h2>
            <p className="mt-2">
              By accessing Everlast Fragrances or placing an order through our
              storefront, you agree to comply with and be bound by the following
              terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. Product Impressions & Disclaimer</h2>
            <p className="mt-2">
              Everlast Fragrances creates original artisanal impressions and
              interpretations inspired by classic fragrance genres. All brand
              names and trademarks mentioned for comparison are the exclusive
              property of their respective trademark holders. Everlast Fragrances
              is not affiliated with or endorsed by original designer brands.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. Order Acceptance & Pricing</h2>
            <p className="mt-2">
              Prices are listed in Pakistani Rupees (PKR). We reserve the right
              to adjust catalog listings, correct pricing typographical errors,
              or cancel unverified or duplicate orders.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
