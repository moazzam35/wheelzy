const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const cars = [
  {
    id: 28,
    name: "Lamborghini Sián FKP",
    brand: "Lamborghini",
    type: "Hybrid",
    price: 3700000,
    year: 2024,
    hp: 819,
    image: "/comp/images/lamborgini-sian.jfif",
    tag: "Hypercar",
    description: "The Lamborghini Sián FKP 37 is a limited-production hybrid supercar — one of the most exclusive Lamborghinis ever built. Its naturally aspirated V12 pairs with a supercapacitor hybrid system for instantaneous torque response.",
    specs: {
      topSpeed: "220 mph",
      acceleration: "2.8s 0–60",
      engine: "6.5L V12 Hybrid",
      drivetrain: "AWD",
    },
  },
  {
    id: 26,
    name: "Lamborghini Aventador",
    brand: "Lamborghini",
    type: "Coupe",
    price: 450000,
    year: 2024,
    hp: 769,
    image: "/comp/images/lamborgini-1.jfif",
    tag: "Hypercar",
    description: "The Aventador LP 780-4 Ultimae is the final evolution of the iconic V12 Aventador lineage — raw, visceral, and uncompromising. A naturally aspirated masterpiece before electrification changes everything.",
    specs: {
      topSpeed: "221 mph",
      acceleration: "2.8s 0–60",
      engine: "6.5L V12",
      drivetrain: "AWD",
    },
  },
  {
    id: 15,
    name: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    type: "Hybrid",
    price: 580000,
    year: 2024,
    hp: 986,
    image: "/comp/images/ferreri-2.jfif",
    tag: "Hypercar",
    description: "Ferrari's most powerful road car ever. The SF90 Stradale combines a twin-turbocharged V8 with three electric motors for a staggering 986 hp, capable of a 0–60 in 2.5 seconds.",
    specs: {
      topSpeed: "211 mph",
      acceleration: "2.5s 0–60",
      engine: "4.0L TT V8 + 3 Motors",
      drivetrain: "AWD",
    },
  },
  {
    id: 27,
    name: "Lamborghini Huracán STO",
    brand: "Lamborghini",
    type: "Coupe",
    price: 330000,
    year: 2024,
    hp: 630,
    image: "/comp/images/lamborgini-2.jfif",
    tag: "Exotic",
    description: "The Huracán STO (Super Trofeo Omologata) brings motorsport DNA directly to the road. Aerodynamic bodywork, racing-derived suspension, and a screaming naturally aspirated V10 make this the most track-focused Lamborghini road car.",
    specs: {
      topSpeed: "193 mph",
      acceleration: "3.0s 0–60",
      engine: "5.2L NA V10",
      drivetrain: "RWD",
    },
  },
  {
    id: 37,
    name: "Rolls-Royce Cullinan",
    brand: "Rolls-Royce",
    type: "SUV",
    price: 430000,
    year: 2024,
    hp: 563,
    image: "/comp/images/rolls-royce-1.jfif",
    tag: "Ultra Luxury",
    description: "The Cullinan is the world's most luxurious SUV. Named after the largest diamond ever discovered, it offers an effortless journey through any terrain wrapped in the finest leathers, woods, and metals Rolls-Royce can source.",
    specs: {
      topSpeed: "155 mph",
      acceleration: "5.2s 0–60",
      engine: "6.75L Twin-Turbo V12",
      drivetrain: "AWD",
    },
  },
  {
    id: 16,
    name: "Nissan GT-R Nismo",
    brand: "Nissan",
    type: "Coupe",
    price: 215000,
    year: 2024,
    hp: 600,
    image: "/comp/images/GT-R.jfif",
    tag: "Limited",
    description: "The GT-R NISMO represents the pinnacle of Nissan performance engineering. Hand-assembled by Nismo technicians, each engine is carefully prepared to extract maximum power from the twin-turbo V6.",
    specs: {
      topSpeed: "196 mph",
      acceleration: "2.5s 0–60",
      engine: "3.8L Twin-Turbo V6",
      drivetrain: "AWD",
    },
  },
  {
    id: 33,
    name: "Porsche 911 Carrera S",
    brand: "Porsche",
    type: "Coupe",
    price: 135000,
    year: 2024,
    hp: 443,
    image: "/comp/images/porsche-911.jfif",
    tag: "Featured",
    description: "The Porsche 911 is the benchmark by which all sports cars are judged. The Carrera S adds a larger twin-turbo flat-six for an even more thrilling experience, while retaining the 911's legendary everyday usability.",
    specs: {
      topSpeed: "191 mph",
      acceleration: "3.5s 0–60",
      engine: "3.0L Twin-Turbo Flat-6",
      drivetrain: "RWD",
    },
  },
  {
    id: 40,
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    type: "Electric",
    price: 95000,
    year: 2024,
    hp: 1020,
    image: "/comp/images/tesla-model-s.jfif",
    tag: "EV",
    description: "The Tesla Model S Plaid is the fastest accelerating production car ever made. Three motors, a tri-motor powertrain, and 1,020 hp deliver a 0–60 in under 2 seconds — while carrying five adults in comfort.",
    specs: {
      topSpeed: "200 mph",
      acceleration: "1.99s 0–60",
      engine: "Tri-Motor Electric",
      drivetrain: "AWD",
    },
  }
];

async function main() {
  console.log("Seeding database...");

  // Seed Users
  const userPasswordHash = await bcrypt.hash("password123", 12);
  const adminPasswordHash = await bcrypt.hash("admin123", 12);

  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Demo User",
      password: userPasswordHash,
      role: "USER",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Demo Admin",
      password: adminPasswordHash,
      role: "ADMIN",
    },
  });

  console.log(`Seeded users: ${user.email} (USER), ${admin.email} (ADMIN)`);

  // Seed Cars
  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.id },
      update: {},
      create: car,
    });
  }

  console.log(`Seeded ${cars.length} cars successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
