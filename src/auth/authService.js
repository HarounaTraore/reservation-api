import pkgg from 'jsonwebtoken';
const { sign } = pkgg;
import { createUser, checkEmail } from "../services/userService.js";
import i18next from "i18next";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;


// const register = async (name,email, address, phone, password, role) => {
//   const hashedPassword = await hash(password, 10);
//   const user = await createUser(name,email, address, phone, hashedPassword, role);
//   return user;
// };

const login = async (email, password) => {
  const user = await checkEmail(email);
  if (!user) {
    throw new Error(i18next.t("authService.userNotExist"));
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(i18next.t("authService.pwsNotExist"));
  }

  const token = sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.SECRET_AUTH,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export default { login };
