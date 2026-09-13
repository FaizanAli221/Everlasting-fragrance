import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Everlast Fragrances",
  description:
    "Learn about our 7-day hassle-free replacement and refund policy for damaged, leaking, or incorrect items.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Refund & Return Policy
        </h1>
        <p className="mt-2 text-xs text-ink/50">Last updated: September 2026</p>

        <div className="mt-8 space-y-8 text-sm text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-ink">1. 7-Day Replacement Guarantee</h2>
            <p className="mt-2">
              Customer satisfaction is our utmost priority. If your order
              arrives damaged in transit, defective, or if an incorrect scent was
              delivered, you are eligible for a <strong>100% free replacement or refund within 7 days</strong> of delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. Eligibility Criteria</h2>
            <ul className="mt-2 list-disc list-inside space-y-1 text-ink/75">
              <li>Item must have been reported within 7 days of parcel receipt.</li>
              <li>Clear photographs or unboxing video showing the damage/leakage must be provided via WhatsApp.</li>
              <li>The bottle must not have been substantially consumed (more than 3–4 test sprays).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. How to Initiate a Return / Claim</h2>
            <p className="mt-2">
              To submit a claim, please message our support team on WhatsApp at{" "}
              <strong>+92 328 3383607</strong> or email{" "}
              <strong>everlastfragrances@gmail.com</strong> with your Order ID,
              delivery address, and photos of the parcel. Our team responds within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">4. Refund Processing</h2>
            <p className="mt-2">
              Approved refunds for COD orders will be transferred via Bank Transfer,
              JazzCash, or Easypaisa within 3–5 working days after verification.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
