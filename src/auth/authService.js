import jwt from 'jsonwebtoken';
import { createUser, checkEmail } from "../services/userService.js";
import i18next from "i18next";
import bcrypt from 'bcryptjs';



const login = async (email, password) => {
  const user = await checkEmail(email);
  if (!user) {
    throw new Error(i18next.t("authService.userNotExist"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(i18next.t("authService.pwsNotExist"));
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.SECRET_AUTH,
    {
      expiresIn: process.env.DURATION,
    }
  );
  return token;
};

export default { login };
