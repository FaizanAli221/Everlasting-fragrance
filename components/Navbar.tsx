"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products as seedProducts } from "@/data/products";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const links = [
  { label: "Shop All", href: "/#shop" },
  { label: "Men", href: "/#shop" },
  { label: "Women", href: "/#shop" },
  { label: "Our Story", href: "/#story" },
  { label: "Contact", href: "/#footer" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    let cancelled = false;
    const timeoutId = setTimeout(async () => {
      try {
        const fetched = await getProducts({ search: trimmed });
        if (!cancelled) setResults(fetched);
      } catch (e) {
        if (!cancelled) {
          setResults(
            seedProducts.filter((p) =>
              p.name.toLowerCase().includes(trimmed.toLowerCase())
            )
          );
        }
      }
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return (
    <header className="relative z-30 border-b border-ink/10 bg-parchment">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <nav className="hidden gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium tracking-wide text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <Link href="/" className="flex flex-col items-center text-center">
          <span className="font-display text-xl tracking-[0.08em] sm:text-2xl">
            Everlast Fragrances
          </span>
          <span className="mt-0.5 hidden text-[10px] font-medium tracking-widest2 text-clay sm:block">
            THE OG &quot;OFFICE FOR MEN&quot; IS BACK NOW
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Account" className="hidden sm:block">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Open cart"
            onClick={openCart}
            className="relative"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[80%] max-w-xs animate-drawerInLeft bg-parchment p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-ink/80 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close search"
            className="absolute inset-0 bg-ink/40"
            onClick={() => setSearchOpen(false)}
          />
          <div className="absolute left-0 right-0 top-0 bg-parchment p-6 shadow-xl">
            <div className="mx-auto flex max-w-2xl items-center gap-3 border-b border-ink/20 pb-3">
              <Search size={20} strokeWidth={1.5} className="text-ink/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances..."
                className="w-full bg-transparent font-body text-base outline-none placeholder:text-ink/40"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            {results.length > 0 && (
              <div className="mx-auto mt-4 max-w-2xl divide-y divide-ink/10">
                {results.map((p) => (
                  <a
                    key={p.id}
                    href={`/#shop`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between py-3 text-sm hover:text-clay"
                  >
                    <span>{p.name}</span>
                    <span className="text-ink/50">
                      Rs.{p.price.toLocaleString()}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
