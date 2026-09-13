export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  size: string;
  accent: string; // hex, used for the bottle liquid / label accent
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  badge?: string;
  featured?: boolean;
  topSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  body: string;
  productName?: string;
}
