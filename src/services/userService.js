import prisma from "../config/prisma.js";

export const getAllUsers = async () => {
  try {
    const result = await prisma.users.findMany();
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const getByIdUser = async (id) => {
  try {
    const result = await prisma.users.findUnique({ where: { id } });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const createUser = async (
  name,
  email,
  address,
  phone,
  password,
  role
) => {
  try {
    const result = await prisma.users.create({
      data: { name, email, address, phone, password, role },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateUser = async (
  id,
  name,
  email,
  address,
  phone,
  password,
  role
) => {
  try {
    const result = await prisma.users.update({
      where: { id },
      data: { name, email, address, phone, password, role },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


export const deleteUser = async (id) => {
  try {
    await prisma.users.delete({ where: { id } });
   return true
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
      result = await prisma.users.findMany({
        where: {
          phone: phone,
          id: {
            not: id,
          },
        },
      });
    } else {
      result = await prisma.users.findMany({
        where: { phone: phone },
      });
    }

    return result.length;
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (id = null, email) => {
  try {
    let result = "";

    if (id) {
      result = await prisma.users.findMany({
        where: {
          email: email,
          id: {
            not: id,
          },
        },
      });
    } else {
      result = await prisma.users.findMany({
        where: { email: email },
      });
    }

    return result.length;
  } catch (error) {
    throw error;
  }
};
