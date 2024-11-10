import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
export const getAllReservations = async () => {
  try {
    const result = await prisma.reservations.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const getByIdReservation = async (id) => {
  try {
    const result = await prisma.reservations.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const createReservation = async (
  dateReservation,
  dateStart,
  dateEnd,
  roomId,
  customerId,
  status,
  token = null,
) => {
  let userId = null;
  const statusUpercase = status.toUpperCase();
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    dateReservation = new Date(dateReservation).toISOString();
    dateStart = new Date(dateStart).toISOString();
    dateEnd = new Date(dateEnd).toISOString();
    const result = await prisma.reservations.create({
      data: {
        dateReservation,
        dateStart,
        dateEnd,
        userId,
        roomId,
        customerId,
        status: statusUpercase,
      },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateReservation = async (
  id,
  dateReservation,
  dateStart,
  dateEnd,
  roomId,
  customerId,
  status,
  token = null,
) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    dateReservation = new Date(dateReservation).toISOString();
    dateStart = new Date(dateStart).toISOString();
    dateEnd = new Date(dateEnd).toISOString();
    const result = await prisma.reservations.update({
      where: { id },
      data: {
        dateReservation,
        dateStart,
        dateEnd,
        userId,
        roomId,
        customerId,
        status,
      },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const updateStatus = async (id, status, token = null) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    const result = await prisma.reservations.update({
      where: { id: id },
      data: { status: status, userId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export const deleteReservation = async (id) => {
  try {
    await prisma.reservations.delete({ where: { id } });
    return true;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
