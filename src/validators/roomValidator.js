import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import { checkName, getByIdRoom } from "../services/roomService.js";
import { StatusCodes } from "http-status-codes";

const validateIdExists = async (id, service, errorMessage) => {
  const result = await service(Number(id));
  if (!result) {
    throw new Error(i18next.t(errorMessage));
  }
  return true;
};

export const addRequestValidator = [
  check("name")
  .trim()
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(i18next.t("roomValidator.lengthName"))
    .bail()
    .matches(/[a-zA-Z]/)
    .withMessage("Le nom doit contenir au moins une lettre.")
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkName(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("roomValidator.nameUnique"));
      }
      return true;
    }),

  check("capacity")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredCapacity"))
    .bail()
    .isInt()
    .withMessage(i18next.t("roomValidator.capacityIsInt"))
    .isInt({ min: 1, max: 10000 })
    .withMessage("La capacité doit etre compris entre 1 et 10000 ")
    .bail(),

  check("equipment")
  .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Le champ équipement doit contenir entre 2 et 500 caractères.")
    .custom((value) => {
      if (/^[0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
        throw new Error(
          "Le champ équipement ne peut pas contenir uniquement des chiffres ou des caractères spéciaux."
        );
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

export const updateRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdRoom, "roomValidator.existRoom")
    ),

  check("name")
  .trim()
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(i18next.t("roomValidator.lengthName"))
    .bail()
    .matches(/[a-zA-Z]/)
    .withMessage("Le nom doit contenir au moins une lettre.")
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkName(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("roomValidator.nameUnique"));
      }
      return true;
    }),

  check("capacity")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredCapacity"))
    .bail()
    .isInt()
    .withMessage(i18next.t("roomValidator.capacityIsInt"))
    .bail()
    .isInt({ min: 1, max: 10000 })
    .withMessage("La capacité doit etre compris entre 1 et 10000 ")
    .bail(),

  check("equipment")
  .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage("Le champ équipement doit contenir entre 2 et 500 caractères.")
    .custom((value) => {
      if (/^[0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
        throw new Error(
          "Le champ équipement ne peut pas contenir uniquement des chiffres ou des caractères spéciaux."
        );
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

export const deleteRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdRoom, "roomValidator.existRoom")
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
    .withMessage(i18next.t("roomValidator.requiredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(value, getByIdRoom, "roomValidator.existRoom")
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
