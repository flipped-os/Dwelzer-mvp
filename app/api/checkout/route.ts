import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2022-11-15" });

export async function POST(req: Request) {
  const { amount, currency = "usd" } = await req.json();

  if (!amount) {
    return NextResponse.json({ error: "Amount required" }, { status: 400 });
  }

  // Create a mock payment intent (escrow)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe uses cents
    currency,
    payment_method_types: ["card"],
    description: "Dwelzer mock escrow payment",
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
