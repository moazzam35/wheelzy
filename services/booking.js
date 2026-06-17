import prisma from "../lib/prisma.js";

export async function createBooking({ userId, carId, date, timeSlot }) {
  if (!carId || !date || !timeSlot) {
    throw new Error("Missing booking details");
  }

  // Parse ISO date string to JS Date object
  const bookingDate = new Date(date);

  return prisma.booking.create({
    data: {
      userId,
      carId: parseInt(carId, 10),
      date: bookingDate,
      timeSlot,
      status: "PENDING",
    },
  });
}

export async function getUserBookings(userId) {
  return prisma.booking.findMany({
    where: { userId },
    include: {
      car: true,
    },
    orderBy: {
      date: "asc",
    },
  });
}

export async function getAllBookings() {
  return prisma.booking.findMany({
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
      date: "desc",
    },
  });
}

export async function updateBookingStatus(bookingId, status) {
  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    throw new Error("Invalid booking status");
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
}

export async function deleteBooking(bookingId) {
  return prisma.booking.delete({
    where: { id: bookingId },
  });
}
