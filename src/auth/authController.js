import i18next from "i18next";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: i18next.t("authController.accessDenied") });
  }
};
