import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Mock KYC verification
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Simulate Veriff verification success
    await prisma.user.update({
      where: { email: session.user.email },
      data: { verified: true },
    });

    return NextResponse.json({ success: true, message: "KYC verified (mock)" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
