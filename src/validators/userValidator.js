import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import {
  checkEmail,
  checkPhone,
  getByIdUser,
} from "../services/userService.js";
import { StatusCodes } from "http-status-codes";

const validateUserId = async (id) => {
  const result = await getByIdUser(Number(id));
  if (!result) {
    throw new Error(i18next.t("userValidator.existUser"));
  }
  return true;
};

export const addRequestValidator = [
  check("name")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredName"))
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage(i18next.t("userValidator.lengthName")),

  check("email")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("userValidator.requiredValidEmail"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkEmail(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.emailUnique"));
      }
      return true;
    }),

  check("address")
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("userValidator.requiredAddress")),

  check("phone")
    .isLength({ min: 8, max: 15 })
    .withMessage(i18next.t("userValidator.requiredPhone"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkPhone(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.phoneUnique"));
      }
      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage(i18next.t("userValidator.passwordLength")),

  check("role")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredRole"))
    .bail()
    .isIn(["Admin", "Manager"])
    .withMessage(i18next.t("userValidator.selectRole")),

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

export const updateRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredId"))
    .bail()
    .custom(validateUserId),

  check("name")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredName"))
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage(i18next.t("userValidator.lengthName")),

  check("email")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isEmail()
    .withMessage(i18next.t("userValidator.requiredValidEmail"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkEmail(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.emailUnique"));
      }
      return true;
    }),

  check("address")
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("userValidator.requiredAddress")),

  check("phone")
    .isLength({ min: 8, max: 15 })
    .withMessage(i18next.t("userValidator.requiredPhone"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkPhone(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.phoneUnique"));
      }
      return true;
    }),

  check("password")
    .isLength({ min: 8 })
    .withMessage(i18next.t("userValidator.passwordLength")),

  check("role")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredRole"))
    .bail()
    .isIn(["Admin", "Manager"])
    .withMessage(i18next.t("userValidator.selectRole")),

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

export const deleteRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredId"))
    .bail()
    .custom(validateUserId),

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

export const getRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredId"))
    .bail()
    .custom(validateUserId),

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
