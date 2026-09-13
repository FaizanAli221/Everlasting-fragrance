"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { topSellers } from "@/data/products";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import StarRating from "./StarRating";
import BottleGraphic from "./BottleGraphic";

export default function Spotlight() {
  const [product, setProduct] = useState<Product | undefined>(topSellers[0]);
  const { addItem } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const items = await getProducts({ topSeller: true });
        if (!cancelled && items.length > 0) {
          setProduct(items[0]);
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

  if (!product) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="text-[11px] font-semibold tracking-widest2 text-clay">
        SPOTLIGHT
      </p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl">Top Seller</h2>

      <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-sm border border-ink/10 sm:grid-cols-2">
        <div className="relative flex items-center justify-center bg-gradient-to-br from-[#5c1a1a] via-[#7a2323] to-[#2a0d0d] py-16">
          <div className="absolute h-40 w-40 rounded-full bg-[#f3d4b0]/30 blur-2xl" />
          <BottleGraphic accent={product.accent} label={product.name} size="lg" />
        </div>
        <div className="flex flex-col justify-center bg-parchment px-8 py-10 sm:px-12">
          <span className="text-[11px] font-semibold tracking-widest2 text-clay">
            {product.category.toUpperCase()}
          </span>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl">
            {product.name}
          </h3>
          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-sm text-ink/60">
              {product.reviewCount} reviews
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
            {product.description}
          </p>
          <div className="mt-5 text-lg font-medium">
            From Rs.{product.price.toLocaleString()}.00 PKR
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addItem(product)}
              className="bg-ink px-6 py-3 text-[13px] font-semibold tracking-wide text-parchment transition-colors hover:bg-ink/80"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
