import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottleGraphic from "@/components/BottleGraphic";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { products, getProductBySlug } from "@/data/products";
import ProductActions from "./ProductActions";
import ProductReviews from "./ProductReviews";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found | Everlast Fragrances" };

  return {
    title: `${product.name} | Everlast Fragrances`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-parchment">
      <Navbar />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <nav className="flex text-xs text-ink/50 space-x-2">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink">
            Shop
          </Link>
          <span>/</span>
          <span className="text-ink truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      {/* Product Main Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual Showcase */}
          <div className="relative flex aspect-square items-center justify-center rounded-sm border border-ink/10 bg-bone p-8">
            {product.badge && (
              <span className="absolute left-6 top-6 bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-parchment">
                {product.badge}
              </span>
            )}
            <div className="scale-110 transition-transform duration-300 hover:scale-125">
              <BottleGraphic
                accent={product.accent}
                label={product.name}
                size="lg"
              />
            </div>
            <div className="absolute bottom-4 right-4 text-[11px] font-medium tracking-wider text-ink/40">
              {product.size}
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-semibold tracking-widest2 text-clay uppercase">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl text-ink">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="mt-1 text-sm text-ink/60 italic">
                {product.subtitle}
              </p>
            )}

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size={16} />
              <span className="text-sm font-medium text-ink/70">
                {product.rating.toFixed(1)} ({product.reviewCount} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3 border-y border-ink/10 py-4">
              <span className="text-2xl font-semibold text-ink">
                Rs.{product.price.toLocaleString()}.00 PKR
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-ink/40 line-through">
                  Rs.{product.compareAtPrice.toLocaleString()}.00 PKR
                </span>
              )}
              <span className="ml-auto text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                In Stock & Ready to Ship
              </span>
            </div>

            {/* Interactive Add to Cart and Buy Now buttons */}
            <ProductActions product={product} />

            {/* Shipping & Delivery perks */}
            <div className="mt-8 space-y-2 border-t border-ink/10 pt-6 text-xs text-ink/70">
              <div className="flex items-center gap-2">
                <span className="text-base">📦</span>
                <span>
                  <strong>Cash on Delivery:</strong> Available nationwide across Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">⚡</span>
                <span>
                  <strong>Fast Delivery:</strong> Delivered within 5 to 7 business days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">✨</span>
                <span>
                  <strong>Concentration:</strong> High-grade Extrait/Parfum for 12+ hours longevity
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-display text-lg">Fragrance Profile</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {product.description}
              </p>
            </div>

            {/* Fragrance Notes Cards */}
            <div className="mt-8">
              <h3 className="font-display text-base tracking-wide uppercase text-ink/80">
                Olfactory Pyramid Notes
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="border border-ink/10 bg-bone/50 p-3.5 rounded-sm">
                  <p className="text-[10px] font-bold tracking-widest2 text-clay uppercase">
                    Top Notes
                  </p>
                  <p className="mt-1.5 text-xs text-ink/80 font-medium">
                    {product.notes.top.join(", ")}
                  </p>
                </div>
                <div className="border border-ink/10 bg-bone/50 p-3.5 rounded-sm">
                  <p className="text-[10px] font-bold tracking-widest2 text-clay uppercase">
                    Heart Notes
                  </p>
                  <p className="mt-1.5 text-xs text-ink/80 font-medium">
                    {product.notes.heart.join(", ")}
                  </p>
                </div>
                <div className="border border-ink/10 bg-bone/50 p-3.5 rounded-sm">
                  <p className="text-[10px] font-bold tracking-widest2 text-clay uppercase">
                    Base Notes
                  </p>
                  <p className="mt-1.5 text-xs text-ink/80 font-medium">
                    {product.notes.base.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ProductReviews productName={product.name} />

      {/* Related Scents */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 border-t border-ink/10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl sm:text-3xl">You May Also Like</h2>
          <Link
            href="/shop"
            className="text-xs font-semibold uppercase tracking-wider text-clay hover:text-ink"
          >
            Explore All Scents &rarr;
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
