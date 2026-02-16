import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const listings = await prisma.listing.findMany({
    include: { createdBy: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, image, price, category, userId } = body;

  if (!title || !description || !price || !category || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      image,
      price,
      category,
      createdBy: { connect: { id: userId } },
    },
  });

  return NextResponse.json(listing);
}
