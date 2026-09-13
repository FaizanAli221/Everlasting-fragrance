"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Clock, Truck, Home } from "lucide-react";
import { Order } from "@/app/api/orders/route";

const steps = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "shipped", label: "In Transit", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTracker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    setLoading(true);
    setError(null);
    setSearched(true);
    setOrder(null);

    try {
      const isPhone = /^[0-9+ ]+$/.test(clean) && !clean.toUpperCase().startsWith("EF");
      const url = isPhone
        ? `/api/orders?phone=${encodeURIComponent(clean.replace(/\s+/g, ""))}`
        : `/api/orders?id=${encodeURIComponent(clean)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please double-check your Order ID or phone number.");
      }

      if (data.order) {
        setOrder(data.order);
      } else if (Array.isArray(data.orders) && data.orders.length > 0) {
        setOrder(data.orders[0]);
      } else {
        throw new Error("No orders found matching that phone number.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to locate order.");
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case "pending":
        return 0;
      case "confirmed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <form
        onSubmit={handleTrack}
        className="mx-auto flex max-w-xl items-center border border-ink/20 bg-white p-2 shadow-sm focus-within:border-ink"
      >
        <Search size={18} className="ml-2 text-ink/40" />
        <input
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Order ID (e.g. EF-...) or Phone (e.g. 03001234567)"
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm outline-none placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-parchment hover:bg-ink/85 disabled:opacity-50 transition-colors"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {/* Error Message */}
      {error && searched && (
        <div className="mx-auto max-w-xl rounded-sm border border-red-200 bg-red-50 p-4 text-center text-xs text-red-700">
          <p>{error}</p>
          <p className="mt-1 text-[11px] text-red-600">
            Need immediate help? Message us directly on WhatsApp at{" "}
            <a
              href="https://wa.me/923283383607"
              className="underline font-semibold"
            >
              +92 328 3383607
            </a>.
          </p>
        </div>
      )}

      {/* Order Found Details */}
      {order && (
        <div className="mx-auto max-w-2xl rounded-sm border border-ink/15 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-5 gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest2 text-clay">
                Order Tracking
              </p>
              <h3 className="font-display text-2xl text-ink font-medium mt-0.5">
                #{order.id}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase text-ink">
                Status: {order.status}
              </span>
              <p className="text-[11px] text-ink/50 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="mt-8">
            <div className="grid grid-cols-4 gap-2 text-center">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                        isPassed
                          ? "border-ink bg-ink text-parchment"
                          : "border-ink/20 bg-bone/30 text-ink/30"
                      } ${isCurrent ? "ring-4 ring-gold/30" : ""}`}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`mt-2 text-[11px] font-medium ${
                        isPassed ? "text-ink" : "text-ink/40"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Horizontal Bar */}
            <div className="relative mx-auto mt-[-35px] mb-8 h-0.5 w-[75%] bg-ink/10 -z-0">
              <div
                className="h-full bg-ink transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-sm border border-ink/10 bg-parchment/40 p-4 text-xs">
            <div>
              <p className="font-bold text-ink uppercase tracking-wider text-[10px]">
                Customer Name
              </p>
              <p className="mt-1 text-ink/80">{order.customer.name}</p>
              <p className="text-ink/60 mt-0.5">{order.customer.phone}</p>
            </div>
            <div>
              <p className="font-bold text-ink uppercase tracking-wider text-[10px]">
                Delivery Address
              </p>
              <p className="mt-1 text-ink/80">{order.customer.address}</p>
              <p className="text-ink/80">{order.customer.city}, Pakistan</p>
            </div>
          </div>

          {/* Items List */}
          <div className="mt-6">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink/70 mb-3">
              Items in Order
            </h4>
            <div className="divide-y divide-ink/10 border-t border-b border-ink/10 text-xs">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-ink/50" />
                    <span className="font-medium text-ink">{item.name}</span>
                    <span className="text-ink/50">× {item.quantity}</span>
                  </div>
                  <span className="font-medium text-ink">
                    Rs.{(item.price * item.quantity).toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-4 flex items-center justify-between text-xs pt-2">
            <span className="text-ink/60">
              Payment Method: <strong>{order.paymentMethod}</strong>
            </span>
            <div className="text-right">
              <span className="text-xs text-ink/60 mr-2">Total:</span>
              <span className="font-display text-lg text-ink font-semibold">
                Rs.{order.total.toLocaleString()}.00 PKR
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
