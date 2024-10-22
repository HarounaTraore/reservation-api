import jwt from "jsonwebtoken";
import { findUser } from "../services/userService.js";
import i18next from "i18next";
import bcrypt from "bcryptjs";

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error(i18next.t("authService.invalidCredentials"));
  }

  const user = await findUser(email);
  console.log(user);

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
      expiresIn: process.env.DURATION,
    },
  );

  return {
    message: i18next.t("authService.loginSuccess"),
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
