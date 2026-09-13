"use client";

import { useState } from "react";
import { Facebook, Instagram, ArrowRight } from "lucide-react";

const quickLinks = [
  "Privacy Policy",
  "About Us",
  "Why Everlast Fragrances?",
  "Shipping Policy",
  "Terms of Service",
  "Refund Policy",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer id="footer" className="bg-ink text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        <div>
          <h3 className="font-display text-xl">Everlast Fragrances</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment/70">
            At Everlast Fragrances, we believe every moment deserves a
            signature scent. Discover fragrances crafted to inspire
            confidence, express individuality, and leave a lasting
            impression.
          </p>
          <p className="mt-5 text-sm text-parchment/70">
            For any queries or support, please feel free to get in touch
            with us. We&apos;re always happy to help.
          </p>
          <p className="mt-3 text-sm text-parchment/90">
            Email: everlastfragrances@gmail.com
          </p>
          <p className="mt-1 text-sm text-parchment/90">
            WhatsApp: +92 328 3383607
          </p>
          <div className="mt-5 flex gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-gold">
              <Facebook size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gold">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-parchment/90">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-sm text-parchment/70 hover:text-gold"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide text-parchment/90">
            Sign up to receive exclusive offers
          </h4>
          <form onSubmit={handleSubmit} className="mt-4 flex max-w-xs">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-parchment/30 bg-transparent px-3 py-2.5 text-sm placeholder:text-parchment/40 focus:border-gold"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex items-center justify-center border border-l-0 border-parchment/30 px-3 hover:border-gold"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          {submitted && (
            <p className="mt-2 text-xs text-goldLight">
              Thanks — you&apos;re on the list.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-parchment/10 px-6 py-5 text-center text-xs text-parchment/50 lg:px-10">
        © {new Date().getFullYear()}, EVERLAST FRAGRANCES
      </div>
    </footer>
  );
}
