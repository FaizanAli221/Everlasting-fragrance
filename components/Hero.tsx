"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getProductBySlug as getSeedProduct } from "@/data/products";
import { getProductBySlug } from "@/lib/api";
import { Product } from "@/lib/types";
import BottleGraphic from "./BottleGraphic";

export default function Hero() {
  const [hero, setHero] = useState<Product>(getSeedProduct("hawas-ice")!);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const item = await getProductBySlug("hawas-ice");
        if (!cancelled && item) {
          setHero(item);
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

  return (
    <section className="relative overflow-hidden bg-ink text-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-6 lg:px-10 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="text-[11px] font-semibold tracking-widest2 text-goldLight">
            NEW SEASON · {hero.size.toUpperCase()}
          </p>
          <h1 className="mt-4 font-display text-4xl italic leading-[1.05] sm:text-5xl lg:text-6xl">
            {hero.name}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/70 sm:text-base">
            {hero.description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-parchment/60">
            <span>Rs.{hero.price.toLocaleString()}.00 PKR</span>
            <span className="h-1 w-1 rounded-full bg-parchment/40" />
            <span>{hero.reviewCount} reviews</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addItem(hero)}
              className="border border-parchment px-7 py-3 text-[13px] font-semibold tracking-wide text-parchment transition-colors hover:bg-parchment hover:text-ink"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addItem(hero);
                openCart();
              }}
              className="bg-gold px-7 py-3 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-goldLight"
            >
              Buy Now
            </button>
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative flex h-[340px] w-[340px] items-center justify-center overflow-hidden rounded-2xl border border-goldLight/25 bg-black/40 p-2 shadow-2xl sm:h-[420px] sm:w-[420px]">
            {hero.image ? (
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={hero.image}
                  alt={hero.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ) : (
              <BottleGraphic accent={hero.accent} label={hero.name} size="lg" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
