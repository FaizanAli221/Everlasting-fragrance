"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import BottleGraphic from "./BottleGraphic";

import { createOrder } from "@/lib/api";

type Step = "cart" | "checkout" | "success";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<Step>("cart");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const shipping = 0;
  const total = subtotal + shipping;

  const handleClose = () => {
    closeCart();
    setTimeout(() => setStep("cart"), 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const data = await createOrder({
        customer: form,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal,
        total,
        paymentMethod: "COD",
      });

      setOrderId(data.order.id);
      setStep("success");
      clearCart();
    } catch (err: any) {
      setError(err.message || "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40"
        onClick={handleClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md animate-drawerIn flex-col bg-parchment shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-xl">
            {step === "cart" && "Your Cart"}
            {step === "checkout" && "Checkout"}
            {step === "success" && "Order Confirmed"}
          </h2>
          <button onClick={handleClose} aria-label="Close">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-ink/50">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-6">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4">
                      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-bone">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <BottleGraphic
                            accent={product.accent}
                            label={product.name}
                            size="sm"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">
                            {product.name}
                          </p>
                          <button
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="text-ink/40 hover:text-ink"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-ink/50">
                          Rs.{product.price.toLocaleString()}.00
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center border border-ink/20 hover:border-ink"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-4 text-center text-sm">
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center border border-ink/20 hover:border-ink"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink/60">Subtotal</span>
                  <span className="font-medium">
                    Rs.{subtotal.toLocaleString()}.00
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink/40">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={() => setStep("checkout")}
                  className="mt-4 w-full bg-ink py-3.5 text-sm font-semibold tracking-wide text-parchment hover:bg-ink/85"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <form
            onSubmit={handlePlaceOrder}
            className="flex flex-1 flex-col overflow-y-auto px-6 py-5"
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-ink/60">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2.5 text-sm focus:border-ink"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">
                  Phone Number
                </label>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2.5 text-sm focus:border-ink"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">
                  Delivery Address
                </label>
                <textarea
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2.5 text-sm focus:border-ink"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">
                  City
                </label>
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2.5 text-sm focus:border-ink"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60">
                  Order Notes (optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full border border-ink/20 bg-white px-3 py-2.5 text-sm focus:border-ink"
                />
              </div>

              <div className="border border-ink/10 bg-bone p-3 text-sm">
                <p className="font-medium">Cash on Delivery</p>
                <p className="mt-0.5 text-xs text-ink/60">
                  Pay in cash when your order arrives.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/60">Total</span>
                <span className="text-base font-semibold">
                  Rs.{total.toLocaleString()}.00
                </span>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-600">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full bg-gold py-3.5 text-sm font-semibold tracking-wide text-ink hover:bg-goldLight disabled:opacity-60"
              >
                {submitting ? "Placing Order..." : "Place Order (COD)"}
              </button>
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="mt-2 w-full py-2 text-xs font-medium text-ink/50 hover:text-ink"
              >
                Back to cart
              </button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="mt-5 font-display text-2xl">Thank you!</h3>
            <p className="mt-2 max-w-xs text-sm text-ink/60">
              Your order <span className="font-medium">#{orderId}</span> has
              been placed. We&apos;ll contact you shortly to confirm delivery.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 border border-ink px-6 py-2.5 text-sm font-medium hover:bg-ink hover:text-parchment"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
