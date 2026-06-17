import prisma from "../lib/prisma.js";

export async function sendMessage({ senderId, receiverId, carId, subject, content }) {
  if (!content) {
    throw new Error("Message content is required");
  }

  return prisma.message.create({
    data: {
      senderId,
      receiverId: receiverId || null,
      carId: carId ? parseInt(carId, 10) : null,
      subject: subject || null,
      content,
    },
  });
}

export async function getUserMessages(userId) {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    include: {
      sender: {
        select: { id: true, name: true, email: true, role: true },
      },
      receiver: {
        select: { id: true, name: true, email: true, role: true },
      },
      car: {
        select: { id: true, name: true, brand: true },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getAllMessages() {
  return prisma.message.findMany({
    include: {
      sender: {
        select: { id: true, name: true, email: true, role: true },
      },
      receiver: {
        select: { id: true, name: true, email: true, role: true },
      },
      car: {
        select: { id: true, name: true, brand: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function markAsRead(messageId) {
  return prisma.message.update({
    where: { id: messageId },
    data: { isRead: true },
  });
}

export async function deleteMessage(messageId) {
  return prisma.message.delete({
    where: { id: messageId },
  });
}
