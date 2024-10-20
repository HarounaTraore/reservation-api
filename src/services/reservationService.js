import prisma from "../config/prisma.js";

export const getAllReservations = async () => {
  try {
    const result = await prisma.reservations.findMany();
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const getByIdReservation = async (id) => {
  try {
    const result = await prisma.reservations.findUnique({ where: { id } });
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
  userId,
  roomId,
  customerId
) => {
  try {
    dateReservation = new Date(dateReservation).toISOString();
    dateStart = new Date(dateStart).toISOString();
    dateEnd = new Date(dateEnd).toISOString();
    const result = await prisma.reservations.create({
      data: { dateReservation, dateStart, dateEnd, userId, roomId, customerId },
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
  userId,
  roomId,
  customerId
) => {
  try {
    dateReservation = new Date(dateReservation).toISOString();
    dateStart = new Date(dateStart).toISOString();
    dateEnd = new Date(dateEnd).toISOString();
    const result = await prisma.reservations.update({
      where: { id },
      data: { dateReservation, dateStart, dateEnd, userId, roomId, customerId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
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
