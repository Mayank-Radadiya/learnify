import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Data Science" },
        { name: "Artificial Intelligence" },
        { name: "Machine Learning" },
        { name: "Web Development" },
        { name: "Mobile App Development" },
        { name: "Cybersecurity" },
        { name: "Cloud Computing" },
        { name: "Blockchain" },
        { name: "Software Engineering" },
        { name: "Game Development" },
        { name: "Programming Languages" },
        { name: "UI/UX Design" },
        { name: "Business & Management" },
        { name: "Marketing & SEO" },
        { name: "Finance & Investing" },
        { name: "Personal Development" },
        { name: "Health & Fitness" },
        { name: "Yoga & Meditation" },
        { name: "Photography" },
        { name: "Video Editing" },
        { name: "Filmmaking" },
        { name: "Music & Audio Production" },
        { name: "Graphic Design" },
        { name: "Animation & Motion Graphics" },
        { name: "Writing & Content Creation" },
        { name: "Public Speaking" },
        { name: "Cooking & Culinary Arts" },
        { name: "Psychology & Mental Health" },
        { name: "Sports & Athletics" },
        { name: "Language Learning" },
        { name: "Ethical Hacking" },
        { name: "Robotics & IoT" },
        { name: "Fashion & Styling" },
        { name: "Interior Design" },
        { name: "Digital Art & Illustration" },
      ],
    });
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error from scripts/Seed.ts ", error);
  } finally {
    await database.$disconnect();
  }
}

await main();
