import { Product, Review } from "./types";
import { Order } from "@/app/api/orders/route";

export interface ProductFilters {
  category?: string;
  search?: string;
  topSeller?: boolean;
  featured?: boolean;
  slug?: string;
  id?: string;
}

export interface CreateOrderPayload {
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  total: number;
  paymentMethod?: string;
}

export interface CreateReviewPayload {
  name: string;
  rating: number;
  title: string;
  body: string;
  productName?: string;
}

/**
 * Fetch products from the backend API with optional filters
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();

  if (filters?.category && filters.category.toLowerCase() !== "all") {
    params.set("category", filters.category);
  }
  if (filters?.search) {
    params.set("search", filters.search);
  }
  if (filters?.topSeller) {
    params.set("topSeller", "true");
  }
  if (filters?.featured) {
    params.set("featured", "true");
  }

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(`/api/products${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const data = await res.json();
  return data.products || [];
}

/**
 * Fetch a single product by slug from the backend API
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch product '${slug}': ${res.statusText}`);
  }

  const data = await res.json();
  return data.product || null;
}

/**
 * Fetch customer reviews from the backend API
 */
export async function getReviews(minRating?: number): Promise<Review[]> {
  const query = minRating ? `?minRating=${minRating}` : "";
  const res = await fetch(`/api/reviews${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch reviews: ${res.statusText}`);
  }

  const data = await res.json();
  return data.reviews || [];
}

/**
 * Submit a customer order to the backend API
 */
export async function createOrder(payload: CreateOrderPayload): Promise<{ success: boolean; order: Order }> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to submit order.");
  }

  return data;
}

/**
 * Submit a customer review to the backend API
 */
export async function submitReview(payload: CreateReviewPayload): Promise<{ success: boolean; review: Review }> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to submit review.");
  }

  return data;
}
