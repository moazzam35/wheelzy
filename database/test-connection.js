require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function test() {
  console.log("=== Database Connection Test ===");

  // Test User table
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true },
  });
  console.log("Users:", JSON.stringify(users, null, 2));

  // Test Car table
  const carCount = await prisma.car.count();
  console.log("Car count:", carCount);

  // Test findUnique
  const admin = await prisma.user.findUnique({ where: { email: "admin@example.com" }, select: { email: true, role: true } });
  console.log("Admin found:", admin);

  console.log("=== All tests passed ===");
}

test()
  .catch((e) => { console.error("FAILED:", e.message); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); await pool.end(); });
