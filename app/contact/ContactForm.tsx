"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate inquiry submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "Order Inquiry", message: "" });
    }, 600);
  };

  return (
    <div className="rounded-sm border border-ink/10 bg-white p-6 sm:p-8 shadow-xs">
      <h3 className="font-display text-xl text-ink">Send Us a Message</h3>
      <p className="mt-1 text-xs text-ink/60">
        Fill in the details below and our team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <div className="mt-6 rounded border border-emerald-300 bg-emerald-50 p-6 text-center">
          <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
          <h4 className="mt-3 font-display text-lg text-emerald-900">
            Message Sent Successfully!
          </h4>
          <p className="mt-1 text-xs text-emerald-700">
            Thank you for reaching out. One of our fragrance specialists will review your message and reply via email or WhatsApp promptly.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 border border-emerald-700 bg-emerald-700 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="font-medium text-ink/70">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Zulqarnain Mangi"
                className="mt-1 w-full border border-ink/20 bg-parchment/30 px-3 py-2.5 outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="font-medium text-ink/70">Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. name@example.com"
                className="mt-1 w-full border border-ink/20 bg-parchment/30 px-3 py-2.5 outline-none focus:border-ink"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="font-medium text-ink/70">Phone / WhatsApp Number</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 0328 3383607"
                className="mt-1 w-full border border-ink/20 bg-parchment/30 px-3 py-2.5 outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="font-medium text-ink/70">Topic / Inquiry Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-1 w-full border border-ink/20 bg-parchment/30 px-3 py-2.5 outline-none focus:border-ink"
              >
                <option value="Order Inquiry">Order Inquiry & Tracking</option>
                <option value="Scent Recommendation">Fragrance Recommendation</option>
                <option value="Damaged Parcel / Exchange">Damaged Parcel / Exchange</option>
                <option value="Wholesale / Bulk Order">Wholesale / Bulk Order</option>
                <option value="Other">Other Query</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-ink/70">Your Message *</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Provide details about your query or order ID..."
              className="mt-1 w-full border border-ink/20 bg-parchment/30 px-3 py-2.5 outline-none focus:border-ink"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 border border-ink bg-ink px-8 py-3 text-xs font-semibold uppercase tracking-wider text-parchment hover:bg-ink/85 disabled:opacity-50 transition-colors"
          >
            <Send size={14} />
            <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
