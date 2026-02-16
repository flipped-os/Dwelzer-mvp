import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure prisma client is exported from lib/prisma.ts
import { getServerSession } from "next-auth"; // For authentication
import { authOptions } from "@/lib/auth"; // your NextAuth config

// Create / Read Listings
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  // KYC check
  if (!session.user.verified) return NextResponse.json({ error: "KYC verification required" }, { status: 403 });

  try {
    const listing = await prisma.listing.create({
      data: {
        title: data.title,
        description: data.description,
        images: data.images, // array of URLs from frontend
        price: Number(data.price),
        category: data.category,
        userId: session.user.id,
      },
    });
    return NextResponse.json(listing);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Fetch all listings
export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: { createdBy: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(listings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update a listing
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: "Listing ID required" }, { status: 400 });

  try {
    const listing = await prisma.listing.updateMany({
      where: { id: data.id, userId: session.user.id },
      data: {
        title: data.title,
        description: data.description,
        images: data.images,
        price: Number(data.price),
        category: data.category,
      },
    });

    return NextResponse.json({ message: "Listing updated", listing });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete a listing
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: "Listing ID required" }, { status: 400 });

  try {
    await prisma.listing.deleteMany({ where: { id: data.id, userId: session.user.id } });
    return NextResponse.json({ message: "Listing deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
