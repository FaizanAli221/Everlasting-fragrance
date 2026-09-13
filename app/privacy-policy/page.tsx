import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Everlast Fragrances",
  description: "Learn how Everlast Fragrances collects, protects, and uses customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-10">
        <h1 className="font-display text-3xl sm:text-4xl text-ink">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-ink/50">Last updated: September 2026</p>

        <div className="mt-8 space-y-6 text-sm text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-ink">1. Information We Collect</h2>
            <p className="mt-2">
              When you place an order on Everlast Fragrances, we collect necessary
              delivery information including your name, contact phone number,
              delivery address, and city. We never sell, rent, or lease customer
              information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">2. How Information is Used</h2>
            <p className="mt-2">
              Customer details are used strictly to fulfill orders, verify
              addresses prior to dispatch, communicate shipping updates, and
              provide customer support via WhatsApp or email.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink">3. Data Security</h2>
            <p className="mt-2">
              We employ strict industry-standard technical safeguards to protect
              your personal data against unauthorized access, alteration, or disclosure.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
