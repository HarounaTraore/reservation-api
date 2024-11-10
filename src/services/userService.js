import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import i18next from "i18next";
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
  role,
) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const result = await prisma.users.create({
      data: { name, email, address, phone, password: hashedPassword, role },
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
  role,
) => {
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const result = await prisma.users.update({
      where: { id },
      data: { name, email, address, phone, password: hashedPassword, role },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const updateCurrentUser = async (
  name,
  email,
  address,
  phone,
  token = null,
) => {
  try {
    let id = null;
    if (token) {
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      id = Number(tokenDecoded.id);
      const result = prisma.users.update({
        where: { id: id },
        data: { name, email, address, phone },
      });
      return result;
    } else {
      throw new Error("Identifiant non reconnu");
    }
  } catch (error) {
    throw error;
  }
};
export const updatePwdCurrentUser = async (
  oldPassword,
  newPassword,
  token = null,
) => {
  try {
    if (!token) {
      throw new Error(i18next.t("authService.tokenMissing"));
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = tokenDecoded.id;

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(i18next.t("authService.userNotFound"));
    }

    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error(i18next.t("authService.pwsNotExist"));
    }
    const passwordHash = await bcryptjs.hash(newPassword, 10);

    const result = await prisma.users.update({
      where: { id },
      data: { password: passwordHash },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await prisma.users.delete({ where: { id } });
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
      result = await prisma.users.findFirst({
        where: {
          email: email,
          id: {
            not: id,
          },
        },
      });
    } else {
      result = await prisma.users.findFirst({
        where: { email: email },
      });
    }
    return result || 0;
  } catch (error) {
    throw error;
  }
};

export const findUser = async (email) => {
  const result = prisma.users.findFirst({
    where: { email: email },
  });
  return result;
};
