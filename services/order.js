import prisma from "../lib/prisma.js";

export async function getUserOrders(userId) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function completeOrder(orderId) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status: "COMPLETED" },
  });
}

export async function updateOrderStatus(orderId, status) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}

export async function deleteOrder(orderId) {
  return prisma.order.delete({
    where: { id: orderId },
  });
}
