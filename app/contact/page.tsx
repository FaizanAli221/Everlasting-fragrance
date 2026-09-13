import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us & FAQ | Everlast Fragrances",
  description:
    "Have questions about your order, shipping, or recommendations? Get in touch with Everlast Fragrances via WhatsApp, email, or our contact form.",
};

const faqs = [
  {
    q: "How long does delivery take across Pakistan?",
    a: "Orders are processed within 24 hours and delivered within 5 to 7 business days via courier services (TCS, Call Courier, Leopards, or Trax).",
  },
  {
    q: "Is Cash on Delivery (COD) available?",
    a: "Yes! We offer nationwide Cash on Delivery across all cities and towns in Pakistan. You only pay when your parcel arrives at your doorstep.",
  },
  {
    q: "How long do Everlast Fragrances last on skin and clothes?",
    a: "Our fragrances are formulated at high Extrait de Parfum concentrations (25%–30% perfume oils). They comfortably project for 4 to 6 hours and last 12+ hours on clothing.",
  },
  {
    q: "What should I do if my parcel arrives damaged or leaking?",
    a: "We take extreme care in packaging, but if transit mishandling occurs, message us on WhatsApp at +92 328 3383607 with photos of the parcel within 7 days, and we will send a free replacement immediately.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-clay">
            We are here to help
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">Get In Touch</h1>
          <p className="mt-3 text-sm text-ink/70">
            Whether you need a personalized scent recommendation, want to track an existing order, or have a question, we would love to assist you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-sm border border-ink/10 bg-bone/60 p-6">
              <h3 className="font-display text-lg">Direct Channels</h3>
              <div className="mt-4 space-y-4 text-xs text-ink/80">
                <div>
                  <p className="font-semibold text-ink uppercase tracking-wider">WhatsApp Support</p>
                  <a
                    href="https://wa.me/923283383607"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-emerald-700 font-medium hover:underline text-sm"
                  >
                    +92 328 3383607 &rarr;
                  </a>
                  <p className="text-[11px] text-ink/50 mt-0.5">Fastest response: 10:00 AM – 9:00 PM PKT</p>
                </div>

                <div className="border-t border-ink/10 pt-3">
                  <p className="font-semibold text-ink uppercase tracking-wider">Email Inquiries</p>
                  <a
                    href="mailto:everlastfragrances@gmail.com"
                    className="mt-1 inline-block text-clay font-medium hover:underline text-sm"
                  >
                    everlastfragrances@gmail.com
                  </a>
                </div>

                <div className="border-t border-ink/10 pt-3">
                  <p className="font-semibold text-ink uppercase tracking-wider">Operating Headquarters</p>
                  <p className="mt-1 text-ink/70">
                    Everlast Fragrances Co.<br />
                    Nationwide Dispatch Hub<br />
                    Karachi / Lahore, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="rounded-sm border border-ink/10 bg-bone/60 p-6">
              <h3 className="font-display text-lg">Frequently Asked Questions</h3>
              <div className="mt-4 space-y-4 divide-y divide-ink/10 text-xs">
                {faqs.map((faq, i) => (
                  <div key={i} className={i > 0 ? "pt-4" : ""}>
                    <p className="font-semibold text-ink">{faq.q}</p>
                    <p className="mt-1.5 text-ink/70 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
