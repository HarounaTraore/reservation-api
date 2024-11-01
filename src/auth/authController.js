import i18next from "i18next";
import { forgotPassword, login, resetPasswordWithOtp } from "./authService.js";
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    res
      .status(401)
      .json({
        message: i18next.t("authController.accessDenied"),
        error: err.message,
      });
  }
};

export const forgotPwd = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    const response = await resetPasswordWithOtp(email, code, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
