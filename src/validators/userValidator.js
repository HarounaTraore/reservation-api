import { check, param, validationResult } from "express-validator";

import jwt from "jsonwebtoken";
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
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthName"))
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom ne doit contenir que des lettres.")
    .bail(),

  check("email")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isLength({ max: 50 })
    .withMessage("L'email ne doit depasser 50 caractères")
    .bail()
    .isEmail()
    .withMessage("Veuillez entrer un email valide")
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
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthName"))
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom ne doit contenir que des lettres.")
    .bail(),

  check("email")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isLength({ max: 50 })
    .withMessage("L'email ne doit depasser 50 caractères")
    .bail()
    .isEmail()
    .withMessage("Veuillez entrer un email valide")
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

  // check("password")
  //   .isLength({ min: 8 })
  //   .withMessage(i18next.t("userValidator.passwordLength")),

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
export const updateStatusRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredId"))
    .bail()
    .custom(validateUserId),

  check("status")
    .notEmpty()
    .withMessage("Statut est obligatoire")
    .bail()
    .isBoolean()
    .withMessage("Statut doit etre Boolean")
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
export const updateCurrentRequestValidator = [
  check("name")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthName"))
    .bail()
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/)
    .withMessage("Le nom ne doit contenir que des lettres.")
    .bail(),

  check("email")
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredEmail"))
    .bail()
    .isLength({ max: 50 })
    .withMessage("L'email ne doit depasser 50 caractères")
    .bail()

    .isEmail()
    .withMessage("Veuillez enter un email valide")
    .bail()

    .custom(async (value, { req }) => {
      const token = req.headers.authorization.split(" ")[1];
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = Number(tokenDecoded.id);
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
      const token = req.headers.authorization.split(" ")[1];
      const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = Number(tokenDecoded.id);
      const result = await checkPhone(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("userValidator.phoneUnique"));
      }
      return true;
    }),
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

export const updtePwdCurrentRequestValidator = [
  check("oldPassword")
    .notEmpty()
    .withMessage("L'encien mot de passe est requis")
    .bail(),
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage(i18next.t("userValidator.passwordLength")),
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
