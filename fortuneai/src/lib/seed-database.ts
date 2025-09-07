import { db } from "./db";
import { readingTypes } from "../drizzle/schema";

export async function seedDatabase(): Promise<void> {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if reading types exist
    const existingTypes = await db.select().from(readingTypes).limit(1);

    if (existingTypes.length === 0) {
      console.log("📚 Seeding reading types...");

      const readingTypesData = [
        {
          name: "Tarot Card Reading",
          description:
            "Discover your future through the ancient art of tarot card interpretation",
          icon: "🃏",
          category: "divination",
          isActive: true,
        },
        {
          name: "Crystal Ball Reading",
          description:
            "Peer into the mystical realm with crystal ball divination",
          icon: "🔮",
          category: "divination",
          isActive: true,
        },
        {
          name: "Palm Reading",
          description: "Unlock the secrets written in the lines of your palm",
          icon: "✋",
          category: "divination",
          isActive: true,
        },
        {
          name: "Astrology Reading",
          description:
            "Explore your destiny through the alignment of the stars",
          icon: "⭐",
          category: "astrology",
          isActive: true,
        },
        {
          name: "Numerology Reading",
          description:
            "Decode the hidden meanings in numbers and their vibrations",
          icon: "🔢",
          category: "divination",
          isActive: true,
        },
        {
          name: "Dream Interpretation",
          description: "Unravel the messages hidden within your dreams",
          icon: "💭",
          category: "interpretation",
          isActive: true,
        },
      ];

      await db.insert(readingTypes).values(readingTypesData);
      console.log("✅ Reading types seeded successfully!");
    } else {
      console.log("✅ Reading types already exist, skipping seeding.");
    }

    console.log("🎉 Database seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✅ Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}
