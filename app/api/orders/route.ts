import { NextRequest, NextResponse } from "next/server";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

// In-memory store. Resets on server restart / redeploy — swap for a real
// database (Postgres, Supabase, etc.) before going to production.
const orders: Order[] = [];

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 900 + 100);
  return `EF-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, total, paymentMethod } = body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { success: false, error: "Missing required customer details." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty." },
        { status: 400 }
      );
    }

    const order: Order = {
      id: generateOrderId(),
      customer,
      items,
      subtotal: Number(subtotal) || 0,
      total: Number(total) || 0,
      paymentMethod: paymentMethod || "COD",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const phone = searchParams.get("phone");

    if (id) {
      const order = orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
      if (!order) {
        return NextResponse.json(
          { success: false, error: "Order not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    if (phone) {
      const filtered = orders.filter((o) => o.customer.phone.includes(phone));
      return NextResponse.json({
        success: true,
        count: filtered.length,
        orders: filtered,
      });
    }

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders." },
      { status: 500 }
    );
  }
}
