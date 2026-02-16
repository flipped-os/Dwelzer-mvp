import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  // Mock Veriff verification (replace with real API later)
  // You can integrate Veriff SDK when live
  await new Promise((res) => setTimeout(res, 1500)); // simulate verification delay

  return NextResponse.json({
    success: true,
    message: "KYC Verified successfully",
    verifiedAt: new Date(),
  });
}
