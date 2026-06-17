import prisma from "../lib/prisma.js";

export async function getCars({ brand, type, priceRange, sort, query } = {}) {
  const where = {};

  if (brand && brand !== "All") {
    where.brand = brand;
  }

  if (type && type !== "All") {
    where.type = type;
  }

  if (priceRange && priceRange !== "All") {
    if (priceRange === "Under $50K") {
      where.price = { lt: 50000 };
    } else if (priceRange === "$50K–$100K") {
      where.price = { gte: 50000, lte: 100000 };
    } else if (priceRange === "$100K–$200K") {
      where.price = { gt: 100000, lte: 200000 };
    } else if (priceRange === "$200K+") {
      where.price = { gt: 200000 };
    }
  }

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { brand: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const orderBy = [];
  if (sort === "price-asc") {
    orderBy.push({ price: "asc" });
  } else if (sort === "price-desc") {
    orderBy.push({ price: "desc" });
  } else if (sort === "hp") {
    orderBy.push({ hp: "desc" });
  } else {
    orderBy.push({ id: "asc" });
  }

  return prisma.car.findMany({
    where,
    orderBy,
  });
}

export async function getCarById(id) {
  return prisma.car.findUnique({
    where: { id: parseInt(id, 10) },
  });
}

export async function createCar(carData) {
  return prisma.car.create({
    data: {
      ...carData,
      id: carData.id ? parseInt(carData.id, 10) : undefined,
      price: parseInt(carData.price, 10),
      year: parseInt(carData.year, 10),
      hp: parseInt(carData.hp, 10),
      specs: carData.specs || {},
    },
  });
}

export async function updateCar(id, carData) {
  return prisma.car.update({
    where: { id: parseInt(id, 10) },
    data: {
      ...carData,
      price: carData.price ? parseInt(carData.price, 10) : undefined,
      year: carData.year ? parseInt(carData.year, 10) : undefined,
      hp: carData.hp ? parseInt(carData.hp, 10) : undefined,
      specs: carData.specs || undefined,
    },
  });
}

export async function deleteCar(id) {
  return prisma.car.delete({
    where: { id: parseInt(id, 10) },
  });
}
