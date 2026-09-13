"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products as initialProducts } from "@/data/products";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const categories = [
  "All",
  "Men",
  "Women",
  "Luxury",
  "Fresh / Summer",
  "Oriental / Warm",
];

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const fetched = await getProducts({
          category: activeCategory === "All" ? undefined : activeCategory,
          search: searchTerm.trim() || undefined,
        });
        if (!cancelled) setProductsList(fetched);
      } catch (err) {
        // Local fallback
        if (!cancelled) {
          let filtered = initialProducts;
          if (activeCategory !== "All") {
            filtered = filtered.filter((p) =>
              p.category.toLowerCase().includes(activeCategory.toLowerCase())
            );
          }
          if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase().trim();
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
          }
          setProductsList(filtered);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [activeCategory, searchTerm]);

  const sortedProducts = useMemo(() => {
    const list = [...productsList];
    if (sortBy === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [productsList, sortBy]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchTerm("");
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav className="flex text-xs text-ink/50 space-x-2 mb-6">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span>/</span>
        <span className="text-ink">Shop Collection</span>
      </nav>

      {/* Header */}
      <div className="border-b border-ink/10 pb-6">
        <h1 className="font-display text-3xl sm:text-4xl">Fragrance Collection</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/65">
          Handcrafted luxury impressions and signature blends with remarkable sillage and all-day longevity.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`border px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? "border-ink bg-ink text-parchment"
                  : "border-ink/20 text-ink/70 hover:border-ink/50 bg-white/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative flex items-center">
            <Search
              size={15}
              className="absolute left-3 text-ink/40"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search scent notes or name..."
              className="w-full sm:w-60 border border-ink/20 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-ink"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 border border-ink/20 bg-white px-3 py-2 text-xs">
            <SlidersHorizontal size={14} className="text-ink/60" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-ink font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between text-xs text-ink/50">
        <span>
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? "fragrance" : "fragrances"}
        </span>
        {(activeCategory !== "All" || searchTerm) && (
          <button
            onClick={resetFilters}
            className="font-medium text-clay hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className={`mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 transition-opacity duration-200 ${loading ? "opacity-60" : "opacity-100"}`}>
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="my-16 rounded-sm border border-dashed border-ink/20 py-16 text-center">
          <p className="font-display text-xl">No matching fragrances found</p>
          <p className="mt-2 text-xs text-ink/60">
            Try adjusting your search terms or category selection.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 border border-ink bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-parchment hover:bg-ink/85"
          >
            Show All Fragrances
          </button>
        </div>
      )}
    </div>
  );
}
