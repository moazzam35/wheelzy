import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 12;

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Missing required registration fields: name, email, and password are required");
  }

  if (name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Please provide a valid email address");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email,
      password: passwordHash,
      role: "USER",
    },
  });

  // Exclude password from returned object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyUserCredentials(email, password) {
  if (!email || !password) {
    return null;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
