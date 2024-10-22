import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import { StatusCodes } from "http-status-codes";
import { getByIdUser } from "../services/userService.js";
import { getByIdCustomer, checkPhone } from "../services/customerService.js";

const validateIdExists = async (id, service, errorMessage) => {
  const result = await service(Number(id));
  if (!result) {
    throw new Error(i18next.t(errorMessage));
  }
  return true;
};

export const addRequestValidator = [
  check("name")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthName"))
    .bail(),

  check("address")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredAddress"))
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthAddress"))
    .bail(),

  check("phone")
    .isLength({ min: 8, max: 15 })
    .withMessage(i18next.t("customerValidator.requiredPhone"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkPhone(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("customerValidator.phoneUnique"));
      }
      return true;
    }),

  check("userId")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredUserId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdUser, "reservationValidator.userNotFound")
    ),

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
    .withMessage(i18next.t("customerValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdCustomer, "customerValidator.existCustomer")
    ),

  check("name")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthName"))
    .bail(),

  check("address")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredAddress"))
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage(i18next.t("customerValidator.lengthAddress"))
    .bail(),

  check("phone")
    .isLength({ min: 8, max: 15 })
    .withMessage(i18next.t("customerValidator.requiredPhone"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkPhone(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("customerValidator.phoneUnique"));
      }
      return true;
    }),

  check("userId")
    .notEmpty()
    .withMessage(i18next.t("customerValidator.requiredUserId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdUser, "reservationValidator.userNotFound")
    ),

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
    .withMessage(i18next.t("customerValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdCustomer, "customerValidator.existCustomer")
    ),

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
    .withMessage(i18next.t("customerValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdCustomer, "customerValidator.existCustomer")
    ),

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