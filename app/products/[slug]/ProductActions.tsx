"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    openCart();
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-ink/70">
          Quantity:
        </label>
        <div className="flex items-center border border-ink/20 bg-white">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center text-ink/70 hover:bg-bone hover:text-ink"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center text-ink/70 hover:bg-bone hover:text-ink"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 border border-ink bg-ink px-8 py-3.5 text-sm font-semibold tracking-wide text-parchment transition-all hover:bg-ink/85 active:scale-[0.98]"
        >
          <ShoppingBag size={17} />
          <span>{added ? "Added to Cart ✓" : "Add to Cart"}</span>
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-2 bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-ink transition-all hover:bg-goldLight active:scale-[0.98]"
        >
          <Zap size={17} />
          <span>Buy Now (Cash on Delivery)</span>
        </button>
      </div>
    </div>
  );
}
