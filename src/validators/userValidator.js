import { check, validationResult } from "express-validator";
import i18next from "i18next";
import { checkPhone } from "../services/userService.js";
import { StatusCodes } from "http-status-codes";

export const addRequestValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage(i18next.t("userValidator.requiredName"))
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage(i18next.t("userValidator.lengthName"))
    .bail(),

  check("email")
    .not()
    .isEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("userValidator.requiredValidEmail"))
    .bail(),

  check("address")
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("userValidator.requiredAddress"))
    .bail(),

  check("phone")
    .isLength({ min: 8, max: 15 })
    .withMessage(i18next.t("userValidator.requiredPhone"))
    .bail()
    .custom(async (value) => {
      const result = await checkPhone(null, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.phoneUnique"));
      }
      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage(i18next.t("userValidator.passwordLength"))
    .bail(),

  check("role")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredRole"))
    .bail()
    .isIn(["Admin", "Manager"])
    .withMessage(i18next.t("userValidator.selectRole"))
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
