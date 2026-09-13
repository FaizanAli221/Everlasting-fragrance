import { NextRequest, NextResponse } from "next/server";
import { reviews as seedReviews } from "@/data/products";
import { Review } from "@/lib/types";

let reviewsStore: Review[] = [...seedReviews];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const minRating = searchParams.get("minRating");

    let result = [...reviewsStore];

    if (minRating) {
      const min = Number(minRating);
      if (!isNaN(min)) {
        result = result.filter((r) => r.rating >= min);
      }
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      reviews: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, title, body: reviewBody, productName } = body;

    if (!name?.trim() || !title?.trim() || !reviewBody?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, title, and review body are required." },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, Number(rating) || 5));

    const newReview: Review = {
      id: `r_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      rating: numericRating,
      title: title.trim(),
      body: reviewBody.trim(),
      productName: productName?.trim() || undefined,
    };

    reviewsStore.unshift(newReview);

    return NextResponse.json(
      { success: true, review: newReview },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid review request payload." },
      { status: 400 }
    );
  }
}
