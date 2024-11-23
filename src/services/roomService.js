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
export const roomsNotReserved = async (dateStart, dateEnd, capacity="") => {
  try {
    
    let capacityFilter;
    if (!capacity) {
      capacityFilter = undefined;
    } else if (capacity < 50) {
      capacityFilter = { lte: 50 };
    } else if (capacity > 50 && capacity <= 100) {
      capacityFilter = { gt: 50, lte: 100 };
    } else if (capacity > 100 && capacity <= 300) {
      capacityFilter = { gt: 100, lte: 300 };
    } else if (capacity > 300 && capacity <= 500) {
      capacityFilter = { gt: 300, lte: 500 };
    } else {
      capacityFilter = { gt: 500 };
    }

    const result = await prisma.rooms.findMany({
      where: {
        reservations: {
          none: {
            dateStart: {
              lte: dateEnd,
            },
            dateEnd: {
              gte: dateStart,
            },
            status: "CONFIRMED",
          },
        },
        ...(capacityFilter && { capacity: capacityFilter }),
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
    const result = await prisma.rooms.findUnique({
      where: { id },
      include: {
        user: {
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
