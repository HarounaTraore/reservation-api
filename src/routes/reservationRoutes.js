import { Router } from "express";
import Reservation from "../controllers/ReservationController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  getRequestValidator,
  updateRequestValidator,
  updateStatusRequestValidator,
} from "../validators/reservationValidator.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";

const router = Router();
router.get(
  "/reservations",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  Reservation.getAllReservations,
);
router.get(
  "/reservation/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  getRequestValidator,
  Reservation.getByIdReservation,
);
router.post(
  "/reservation",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  addRequestValidator,
  Reservation.createReservation,
);
router.put(
  "/reservation/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  updateRequestValidator,
  Reservation.updateReservation,
);
router.put(
  "/reservation-status/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  updateStatusRequestValidator,
  Reservation.updateStatus,
);
router.delete(
  "/reservation/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  deleteRequestValidator,
  Reservation.deleteReservation,
);

export default router;
