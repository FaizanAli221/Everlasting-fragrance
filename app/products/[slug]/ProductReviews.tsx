"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import StarRating from "@/components/StarRating";
import { reviews as seedReviews } from "@/data/products";
import { getReviews, submitReview } from "@/lib/api";
import { Review } from "@/lib/types";

export default function ProductReviews({ productName }: { productName: string }) {
  const [reviewsList, setReviewsList] = useState<Review[]>(seedReviews);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    title: "",
    body: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getReviews();
        if (!cancelled && data.length > 0) {
          setReviewsList(data);
        }
      } catch (e) {
        // fallback to seed
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const relevant = reviewsList.filter(
    (r) =>
      !r.productName ||
      r.productName.toLowerCase().includes(productName.toLowerCase()) ||
      productName.toLowerCase().includes(r.productName.toLowerCase())
  );

  const displayed = relevant.length > 0 ? relevant : reviewsList.slice(0, 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitReview({
        name: form.name,
        rating: form.rating,
        title: form.title,
        body: form.body,
        productName,
      });

      setReviewsList((prev) => [res.review, ...prev]);
      setSuccess(true);
      setShowForm(false);
      setForm({ name: "", rating: 5, title: "", body: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-t border-ink/10 bg-bone/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">Customer Reviews</h2>
            <p className="mt-1 text-xs text-ink/60">
              Verified customer opinions on {productName}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 border border-ink bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-parchment self-start sm:self-auto"
          >
            <MessageSquarePlus size={15} />
            <span>{showForm ? "Close Form" : "Write a Review"}</span>
          </button>
        </div>

        {success && (
          <div className="mt-6 flex items-center gap-2 rounded border border-emerald-300 bg-emerald-50 p-4 text-xs font-medium text-emerald-800">
            <CheckCircle2 size={16} />
            <span>Thank you! Your review has been submitted and published.</span>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-2xl rounded-sm border border-ink/15 bg-parchment p-6 shadow-sm"
          >
            <h3 className="font-display text-lg">Share Your Experience</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-ink/70">
                  Your Rating
                </label>
                <div className="mt-1 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1 text-ink"
                    >
                      <Star
                        size={20}
                        className={
                          star <= form.rating
                            ? "fill-gold text-gold"
                            : "text-ink/20"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-semibold text-ink/60">
                    {form.rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-ink/70">
                    Your Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Bilal Ahmed"
                    className="mt-1 w-full border border-ink/20 bg-white px-3 py-2 text-xs outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink/70">
                    Review Headline
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Masterpiece! Lasts 12+ hours"
                    className="mt-1 w-full border border-ink/20 bg-white px-3 py-2 text-xs outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink/70">
                  Review Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Tell others about the scent profile, longevity, and projection..."
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2 text-xs outline-none focus:border-ink"
                />
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-parchment hover:bg-ink/85 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}

        {/* Review Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((r) => (
            <div
              key={r.id}
              className="flex flex-col justify-between border border-ink/10 bg-parchment p-5 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <StarRating rating={r.rating} size={13} />
                  <span className="text-[10px] font-semibold text-clay uppercase">
                    Verified Buyer
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-ink">
                  {r.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-ink/70">
                  {r.body}
                </p>
              </div>
              <div className="mt-4 border-t border-ink/5 pt-2 text-[11px] font-medium text-ink/50">
                — {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
