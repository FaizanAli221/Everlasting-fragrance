import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Everlast Fragrances",
  description:
    "Information regarding dispatch, shipping timelines, Cash on Delivery procedures, and courier delivery across Pakistan.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Shipping & Delivery Policy
        </h1>
        <p className="mt-2 text-xs text-ink/50">Last updated: September 2026</p>

        <div className="mt-8 space-y-8 text-sm text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-ink">1. Nationwide Coverage</h2>
            <p className="mt-2">
              Everlast Fragrances delivers to all major cities, towns, and postal
              regions across Pakistan including Karachi, Lahore, Islamabad,
              Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Hyderabad,
              Sialkot, and surrounding areas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. Delivery Timeframes</h2>
            <p className="mt-2">
              All orders are processed and packed within 24 to 48 hours of
              order confirmation. Standard delivery time is <strong>5 to 7 business days</strong>.
              During peak sales campaigns or public holidays, delivery may take up to 8–10 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. Cash on Delivery (COD)</h2>
            <p className="mt-2">
              We offer Cash on Delivery across Pakistan. Please ensure the
              exact payable amount is available when the courier representative
              arrives. Couriers cannot hand over parcels without receiving payment first.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">4. Order Verification & Tracking</h2>
            <p className="mt-2">
              Before parcel dispatch, our logistics team may contact you via
              phone or WhatsApp to confirm your delivery address. Once dispatched,
              you will receive a tracking link via SMS/WhatsApp or you can check
              status directly on our <a href="/track-order" className="underline font-medium text-ink">Order Tracking Page</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">5. Packaging Integrity</h2>
            <p className="mt-2">
              Every bottle is individually wrapped in protective cushioning and
              sealed inside an impact-resistant Everlast presentation box to
              prevent transit breakage or temperature exposure.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
