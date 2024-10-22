import prisma from "../config/prisma.js";

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
export const createRoom = async (name, capacity, equipment, status, userId) => {
  try {
    const result = await prisma.rooms.create({
      data: { name, capacity, equipment, status, userId },
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
  status,
  userId,
) => {
  try {
    const result = await prisma.rooms.update({
      where: { id },
      data: { name, capacity, equipment, status, userId },
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
