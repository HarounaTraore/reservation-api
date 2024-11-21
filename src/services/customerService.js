import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const getAllCustomers = async (name = "") => {
  try {
    const result = await prisma.customers.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }
        : {},
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
    throw error; // Relancer l'erreur pour la gestion
  } finally {
    await prisma.$disconnect(); // Déconnexion propre de Prisma
  }
};

export const getByIdCustomer = async (id) => {
  try {
    const result = await prisma.customers.findUnique({
      where: { id },
      include: {
        reservations: {
          select: {
            dateStart: true,
            dateEnd: true,
            dateReservation: true,
            room: {
              select: {
                name: true,
              },
            },
          },
        },
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

export const customerAndThisReservation = async (name) => {
  return await prisma.customers.findMany({
    where: {
      name: {
        contains: name, // Recherche partielle
        mode: "insensitive", // Rend la recherche insensible à la casse
      },
    },
    include: {
      reservations: {
        include: {
          room: {
            select: { name: true },
          },
        },
      },
    },
  });
};

export const createCustomer = async (name, address, phone, token = null) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    const result = await prisma.customers.create({
      data: { name, address, phone, userId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateCustomer = async (
  id,
  name,
  address,
  phone,
  token = null
) => {
  let userId = null;
  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = tokenDecoded.id;
  }
  try {
    const result = await prisma.customers.update({
      where: { id },
      data: { name, address, phone, userId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const deleteCustomer = async (id) => {
  try {
    await prisma.customers.delete({ where: { id } });
    return true;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const checkPhone = async (id = null, phone) => {
  try {
    let result = "";

    if (id) {
      result = await prisma.customers.findMany({
        where: {
          phone: phone,
          id: {
            not: id,
          },
        },
      });
    } else {
      result = await prisma.customers.findMany({
        where: { phone: phone },
      });
    }
    return result.length;
  } catch (error) {
    throw error;
  }
};
