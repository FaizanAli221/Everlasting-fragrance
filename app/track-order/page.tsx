import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderTracker from "./OrderTracker";

export const metadata: Metadata = {
  title: "Track Your Order | Everlast Fragrances",
  description:
    "Check live delivery status for your Everlast Fragrances parcel using your Order ID or phone number.",
};

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-clay">
            Real-time Status
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">Track Your Order</h1>
          <p className="mt-2 text-xs sm:text-sm text-ink/65 max-w-md mx-auto">
            Enter the Order ID from your confirmation screen (e.g. EF-...) or the phone number used at checkout.
          </p>
        </div>

        <div className="mt-8">
          <OrderTracker />
        </div>
      </div>
      <Footer />
    </main>
  );
}
