import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { Product } from "@/lib/types";

// In-memory catalog initialized from seed data
let catalog: Product[] = [...products];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const topSeller = searchParams.get("topSeller");
    const featured = searchParams.get("featured");

    // Single product lookup
    if (slug) {
      const product = catalog.find((p) => p.slug === slug);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product with slug '${slug}' not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    }

    if (id) {
      const product = catalog.find((p) => p.id === id);
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Product with id '${id}' not found.` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    }

    // Filtered search
    let result = [...catalog];

    if (category && category.toLowerCase() !== "all") {
      result = result.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q))
      );
    }

    if (topSeller === "true") {
      result = result.filter((p) => p.topSeller);
    }

    if (featured === "true") {
      result = result.filter((p) => p.featured);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      products: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
