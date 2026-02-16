// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const masterUser = await prisma.user.upsert({
    where: { email: "master@dwelzer.com" },
    update: {},
    create: {
      name: "Master User",
      email: "master@dwelzer.com",
      role: "PRO",
      verified: true,
    },
  });

  const categories = ["HOTELS", "SHORTLETS", "REAL_ESTATE", "MARKETPLACE", "LEGAL"] as const;

  for (const cat of categories) {
    for (let i = 1; i <= 7; i++) {
      await prisma.listing.create({
        data: {
          title: `${cat} Listing ${i}`,
          description: `Description for ${cat} ${i}`,
          image: "https://via.placeholder.com/400x300",
          price: Math.floor(Math.random() * 1000) + 100,
          category: cat,
          createdBy: { connect: { id: masterUser.id } },
        },
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
