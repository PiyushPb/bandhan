import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { TEMPLATES } from "@/data/templates/valentine";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    // 1. Verify the user is authenticated
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse and validate request body
    const { templateId } = await request.json();

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // 3. Look up the real price from server-side template data (prevents price tampering)
    const template = TEMPLATES.find((t) => t.id === templateId);

    if (!template) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      );
    }

    if (template.status === "sold-out") {
      return NextResponse.json(
        { error: "This template is currently unavailable" },
        { status: 400 }
      );
    }

    // 4. Create Razorpay order (amount in paise)
    const order = await razorpay.orders.create({
      amount: template.price * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        userId: user.id,
        templateId: template.id,
        templateName: template.name,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      templateName: template.name,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
