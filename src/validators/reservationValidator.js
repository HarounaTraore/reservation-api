import { check, param, validationResult } from "express-validator";
import i18next from "i18next";
import { getByIdReservation } from "../services/reservationService.js";
import { getByIdCustomer } from "../services/customerService.js";
import { getByIdRoom } from "../services/roomService.js";
import { StatusCodes } from "http-status-codes";

const validateIdExists = async (id, service, errorMessage) => {
  const result = await service(Number(id));
  if (!result) {
    throw new Error(i18next.t(errorMessage));
  }
  return true;
};

const validateDate = (value, errorMessage) => {
  if (isNaN(Date.parse(value))) {
    throw new Error(i18next.t(errorMessage));
  }
  return true;
};

const dateValidation = (field, messageKey) =>
  check(field)
    .notEmpty()
    .withMessage(i18next.t(messageKey))
    .bail()
    .custom((value) => validateDate(value, "reservationValidator.typeDate"))
    .bail();

const idValidation = (field, service, messageKey) =>
  check(field)
    .notEmpty()
    .withMessage(i18next.t(messageKey))
    .bail()
    .custom(async (value) => {
      switch (field) {
        case "userId":
          return validateIdExists(
            value,
            service,
            "reservationValidator.userNotFound",
          );
        case "roomId":
          return validateIdExists(
            value,
            service,
            "reservationValidator.roomNotFound",
          );
        case "customerId":
          return validateIdExists(
            value,
            service,
            "reservationValidator.customerNotFound",
          );
        default:
          return validateIdExists(
            value,
            service,
            "reservationValidator.existreservation",
          );
      }
    })
    .bail();

export const addRequestValidator = [
  check("status")
    .toUpperCase()
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.statusRequis"))
    .bail()
    .isIn(["CONFIRMED", "PENDING"])
    .withMessage(i18next.t("reservationValidator.status"))
    .bail(),
  dateValidation(
    "dateReservation",
    "reservationValidator.requiredDateReservation",
  ),
  dateValidation("dateStart", "reservationValidator.requiredDateStart"),
  dateValidation("dateEnd", "reservationValidator.requiredDateEnd"),
  idValidation("roomId", getByIdRoom, "reservationValidator.requiredRole"),
  idValidation(
    "customerId",
    getByIdCustomer,
    "reservationValidator.requiredRole",
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
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(
        value,
        getByIdReservation,
        "reservationValidator.existreservation",
      ),
    )
    .bail(),
  check("status")
    .toUpperCase()
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredRole"))
    .bail()
    .isIn(["CONFIRMED", "PENDING", "CANCELED"])
    .withMessage(i18next.t("reservationValidator.status"))
    .bail(),

  dateValidation(
    "dateReservation",
    "reservationValidator.requiredDateReservation",
  ),
  dateValidation("dateStart", "reservationValidator.requiredDateStart"),
  dateValidation("dateEnd", "reservationValidator.requiredDateEnd"),
  idValidation("roomId", getByIdRoom, "reservationValidator.requiredRole"),
  idValidation(
    "customerId",
    getByIdCustomer,
    "reservationValidator.requiredRole",
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
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(
        value,
        getByIdReservation,
        "reservationValidator.existreservation",
      ),
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
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(
        value,
        getByIdReservation,
        "reservationValidator.existreservation",
      ),
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

export const updateStatusRequestValidator = [
  param("id")
    .notEmpty()
    .withMessage(i18next.t("reservationValidator.requieredId"))
    .bail()
    .custom(async (value) =>
      validateIdExists(
        value,
        getByIdReservation,
        "reservationValidator.existreservation",
      ),
    )
    .bail(),
  check("status")
    .toUpperCase()
    .notEmpty()
    .withMessage(i18next.t("userValidator.requiredRole"))
    .bail()
    .isIn(["CONFIRMED", "PENDING", "CANCELED"])
    .withMessage(i18next.t("reservationValidator.status"))
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
