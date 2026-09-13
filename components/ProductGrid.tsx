"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const filters = ["All", "Men", "Women", "Unisex", "Luxury"];

export default function ProductGrid() {
  const [active, setActive] = useState("All");
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const fetched = await getProducts({ category: active });
        if (!cancelled) {
          setProductList(fetched);
        }
      } catch (err) {
        // Fallback to local filter if API fails
        if (!cancelled) {
          const fallback = initialProducts.filter((p) => {
            if (active === "All") return true;
            return p.category.toLowerCase().includes(active.toLowerCase());
          });
          setProductList(fallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <p className="text-[11px] font-semibold tracking-widest2 text-clay">
        EVERYONE IS TALKING ABOUT
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl sm:text-4xl">Most Seller</h2>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`border px-4 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                active === f
                  ? "border-ink bg-ink text-parchment"
                  : "border-ink/20 text-ink/60 hover:border-ink/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={`mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 transition-opacity duration-200 ${loading ? "opacity-60" : "opacity-100"}`}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/shop"
          className="border border-ink px-8 py-3 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-ink hover:text-parchment"
        >
          View All Fragrances
        </Link>
      </div>
    </section>
  );
}
