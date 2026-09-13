"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { reviews as initialReviews } from "@/data/products";
import { getReviews } from "@/lib/api";
import { Review } from "@/lib/types";
import StarRating from "./StarRating";

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviewList, setReviewList] = useState<Review[]>(initialReviews);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getReviews();
        if (!cancelled && data.length > 0) {
          setReviewList(data);
        }
      } catch (e) {
        // keep fallback
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-bone py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Let customers speak for us
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <StarRating rating={4.9} size={18} />
          </div>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-ink/60">
            from 287 reviews <BadgeCheck size={15} className="text-clay" />
          </p>
        </div>

        <div className="relative mt-10">
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {reviewList.map((r) => (
              <div
                key={r.id}
                className="w-[280px] shrink-0 border border-ink/10 bg-parchment p-6"
              >
                <StarRating rating={r.rating} size={14} />
                <h3 className="mt-3 text-sm font-semibold leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-ink/70">
                  {r.body}
                </p>
                <p className="mt-4 text-xs font-medium tracking-wide text-ink/50">
                  {r.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous reviews"
              className="flex h-9 w-9 items-center justify-center border border-ink/20 hover:border-ink"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next reviews"
              className="flex h-9 w-9 items-center justify-center border border-ink/20 hover:border-ink"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <BadgeCheck size={20} className="text-clay" />
            4.9
            <StarRating rating={4.9} size={16} />
          </div>
          <p className="flex items-center gap-1.5 text-sm text-ink/60">
            4.9 out of 5 stars based on 287 reviews
            <span className="text-clay">· Verified</span>
          </p>
        </div>
      </div>
    </section>
  );
}
