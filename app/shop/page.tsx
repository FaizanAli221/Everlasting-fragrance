import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopCatalog from "./ShopCatalog";

export const metadata: Metadata = {
  title: "Shop Luxury Fragrances | Everlast Fragrances",
  description:
    "Explore our complete collection of long-lasting luxury perfumes. Office for Men, Hawas Ice, Imperial Valley, and more. Nationwide cash on delivery.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center text-sm text-ink/50">Loading collection...</div>}>
        <ShopCatalog />
      </Suspense>
      <Footer />
    </main>
  );
}
