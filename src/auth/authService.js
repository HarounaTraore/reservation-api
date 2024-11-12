import jwt from "jsonwebtoken";
import { findUser } from "../services/userService.js";
import i18next from "i18next";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendOtpEmail } from "./mailService.js";
import prisma from "../config/prisma.js";

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error(i18next.t("authService.invalidCredentials"));
  }

  const user = await findUser(email);

  if (!user) {
    throw new Error(i18next.t("authService.userNotExist"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(i18next.t("authService.pwsNotExist"));
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      status: user.status,
      role: user.role,
    },
  };
};

export const forgotPassword = async (email) => {
  const user = await findUser(email);
  if (!user) {
    throw new Error(i18next.t("authService.userNotExist"));
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expireAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      code,
      expireAt,
    },
  });

  await sendOtpEmail(user.email, code);

  return { message: i18next.t("authService.otpEmailSent") };
};

export const resetPasswordWithOtp = async (email, code, newPassword) => {
  const user = await findUser(email);
  if (!user) {
    throw new Error(i18next.t("authService.userNotExist"));
  }

  const passwordReset = await prisma.passwordReset.findFirst({
    where: {
      userId: user.id,
      code,
      expireAt: {
        gte: new Date(),
      },
    },
  });

  if (!passwordReset) {
    throw new Error("Veuillez verifier votre code de réinitialisation.");
  }
  if (newPassword.length < 8) {
    throw new Error("Le mot de passe doit être au moins 8 caractères");
  }
  
  const hashedPassword = await bcrypt.hash(
    newPassword,
    parseInt(process.env.SALT_ROUNDS, 10),
  );

  await prisma.users.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordReset.delete({
    where: { id: passwordReset.id },
  });

  return { message: i18next.t("authService.passwordResetSuccess") };
};
