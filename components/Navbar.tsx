"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products as seedProducts } from "@/data/products";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const links = [
  { label: "Shop All", href: "/shop" },
  { label: "Men", href: "/shop?category=Men" },
  { label: "Women", href: "/shop?category=Women" },
  { label: "Track Order", href: "/track-order" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
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
          <nav className="hidden gap-6 lg:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[13px] font-medium tracking-wide text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
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
          <Link
            href="/track-order"
            aria-label="Track Order"
            className="hidden sm:block text-ink/80 hover:text-ink"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>
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
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-ink/80 hover:text-ink"
                >
                  {l.label}
                </Link>
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
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between py-2.5 text-sm hover:text-clay group"
                  >
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-bone">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded bg-bone" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium group-hover:text-clay text-ink">{p.name}</span>
                        <span className="text-[11px] text-ink/50">{p.category}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-xs text-ink/70">
                      Rs.{p.price.toLocaleString()}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
