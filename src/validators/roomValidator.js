import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import { checkName, getByIdRoom } from "../services/roomService.js";
import { StatusCodes } from "http-status-codes";
import { getByIdUser } from "../services/userService.js";

export const addRequestValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage(i18next.t("roomValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(i18next.t("roomValidator.lengthName"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkName(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("roomValidator.nameUnique"));
      } else return true;
    }),

  check("capacity")
    .not()
    .isEmpty()
    .withMessage(i18next.t("roomValidator.requiredCapacity"))
    .bail()

    .isInt()
    .withMessage(i18next.t("roomValidator.capacityIsInt"))
    .bail(),

  check("equipment")
    .isLength({ min: 2, max: 500 })
    .withMessage(i18next.t("roomValidator.requiredAddress"))
    .bail(),

  check("status")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredRole"))
    .bail()
    .isIn(["Réservée", "Non Réservée"])
    .withMessage(i18next.t("roomValidator.selectRole"))
    .bail(),

  check("userId")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdUser(id);
      if (result === 0) {
        throw new Error(i18next.t("roomValidator.existroom"));
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
    .withMessage(i18next.t("roomValidator.requieredId"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdRoom(id);
      if (result === 0) {
        throw new Error(i18next.t("roomValidator.existroom"));
      }
      return true;
    }),
  check("name")
    .not()
    .isEmpty()
    .withMessage(i18next.t("roomValidator.requiredName"))
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(i18next.t("roomValidator.lengthName"))
    .bail()
    .custom(async (value, { req }) => {
      const id = Number(req.params.id);
      const result = await checkName(id, value);
      if (result !== 0) {
        throw new Error(i18next.t("roomValidator.nameUnique"));
      } else return true;
    }),

  check("capacity")
    .not()
    .isEmpty()
    .withMessage(i18next.t("roomValidator.requiredCapacity"))
    .bail()

    .isInt()
    .withMessage(i18next.t("roomValidator.capacityIsInt"))
    .bail(),

  check("equipment")
    .isLength({ min: 2, max: 500 })
    .withMessage(i18next.t("roomValidator.requiredAddress"))
    .bail(),

  check("status")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredRole"))
    .bail()
    .isIn(["Réservée", "Non Réservée"])
    .withMessage(i18next.t("roomValidator.selectRole"))
    .bail(),

  check("userId")
    .notEmpty()
    .withMessage(i18next.t("roomValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdUser(id);
      if (result === 0) {
        throw new Error(i18next.t("roomValidator.existroom"));
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
    .withMessage(i18next.t("roomValidator.requieredId"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdRoom(id);
      if (result === 0) {
        throw new Error(i18next.t("roomValidator.existroom"));
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
