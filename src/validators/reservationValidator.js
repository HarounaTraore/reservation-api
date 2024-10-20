import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import { getByIdReservation } from "../services/reservationService.js";
import { getByIdUser } from "../services/userService.js";
import { getByIdRoom } from "../services/roomService.js";
import { getByIdCustomer } from "../services/customerService.js";
import { StatusCodes } from "http-status-codes";

export const addRequestValidator = [
  check("dateReservation")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateReservation"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),

  check("dateStart")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateStart"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),

  check("dateEnd")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateEnd"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),
  check("userId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdUser(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    }),
  check("roomId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdRoom(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    }),

  check("customerId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdCustomer(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
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
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdReservation(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    })
    .bail(),
  check("dateReservation")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateReservation"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),

  check("dateStart")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateStart"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),

  check("dateEnd")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredDateEnd"))
    .bail()
    .custom((value) => {
      if (isNaN(Date.parse(value))) {
        throw new Error(i18next.t("reservationValidator.typeDate"));
      }
      return true;
    })
    .bail(),
  check("userId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdUser(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    }),
  check("roomId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdRoom(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    }),

  check("customerId")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requiredRole"))
    .bail()

    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdCustomer(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());

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
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) => {
      const id = Number(value);
      const result = await getByIdReservation(id);
      if (result === 0) {
        throw new Error(i18next.t("reservationValidator.existreservation"));
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
