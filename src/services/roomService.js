import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
export const getAllRooms = async () => {
  try {
    const result = await prisma.rooms.findMany();
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const roomsNotReserved = async (dateStart, dateEnd) => {
  try {
    const result = await prisma.rooms.findMany({
      where: {
        // Sélectionner les salles où aucune réservation confirmée n'existe pendant la période donnée
        reservations: {
          none: {
            dateStart: {
              lte: dateEnd,
            },
            dateEnd: {
              gte: dateStart,
            },
            status: 'CONFIRMED', 
          },
        },
      },
      include: {
        reservations: {
          select: {
            id: true,
            status: true, 
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


export const getByIdRoom = async (id) => {
  try {
    const result = await prisma.rooms.findUnique({ where: { id } });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const createRoom = async (name, capacity, equipment, token = null) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    const result = await prisma.rooms.create({
      data: { name, capacity, equipment, userId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateRoom = async (
  id,
  name,
  capacity,
  equipment,
  token = null
) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    const result = await prisma.rooms.update({
      where: { id },
      data: { name, capacity, equipment, userId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const deleteRoom = async (id) => {
  try {
    await prisma.rooms.delete({ where: { id } });
    return true;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const checkName = async (id = null, name) => {
  try {
    let result = "";

    if (id) {
      result = await prisma.rooms.findMany({
        where: {
          name: name,
          id: {
            not: id,
          },
        },
      });
    } else {
      result = await prisma.rooms.findMany({
        where: { name: name },
      });
    }

    return result.length;
  } catch (error) {
    throw error;
  }
};
