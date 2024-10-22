import prisma from "../config/prisma.js";

export const getAllCustomers = async () => {
  try {
    const result = await prisma.customers.findMany();
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const getByIdCustomer = async (id) => {
  try {
    const result = await prisma.customers.findUnique({ where: { id } });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const createCustomer = async (name, address, phone, userId) => {
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

export const updateCustomer = async (id, name, address, phone, userId) => {
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
