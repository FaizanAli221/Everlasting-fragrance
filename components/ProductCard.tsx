"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import StarRating from "./StarRating";
import BottleGraphic from "./BottleGraphic";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();

  return (
    <div className="group flex flex-col">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-bone">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 bg-ink px-2.5 py-1 text-[10px] font-semibold tracking-wide text-parchment">
            {product.badge}
          </span>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="relative flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <BottleGraphic accent={product.accent} label={product.name} size="md" />
          )}
        </Link>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <button
            onClick={() => addItem(product)}
            className="flex-1 bg-ink py-2.5 text-[11px] font-semibold tracking-wide text-parchment hover:bg-ink/85"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              addItem(product);
              openCart();
            }}
            className="flex-1 bg-gold py-2.5 text-[11px] font-semibold tracking-wide text-ink hover:bg-goldLight"
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-ink hover:text-clay transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs text-ink/50">
            {product.reviewCount} reviews
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/80">
          {product.compareAtPrice ? "From " : ""}Rs.
          {product.price.toLocaleString()}.00 PKR
        </p>
      </div>
    </div>
  );
}
