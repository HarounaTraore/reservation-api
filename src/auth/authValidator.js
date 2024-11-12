import { check, validationResult } from "express-validator";
import i18next from "i18next";
import { StatusCodes } from "http-status-codes";

// Validator for login
export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("authValidator.requiredValidEmail")),
  check("password")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredPassword"))
    .bail()
    .isLength({ min: 8 })
    .withMessage(i18next.t("authValidator.passwordLength")),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for forgotPassword
export const forgotPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("authValidator.requiredValidEmail")),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for resetPasswordWithOtp
export const resetPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("authValidator.requiredValidEmail")),
  check("code")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredOtp")),
  check("newPassword")
    .notEmpty()
    .withMessage(i18next.t("authValidator.requiredPassword"))
    .bail()
    .isLength({ min: 8 })
    .withMessage(i18next.t("authValidator.passwordLength")),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];
