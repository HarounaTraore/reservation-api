import { Router } from "express";
import Reservation from "../controllers/ReservationController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
} from "../validators/reservationValidator.js";
addRequestValidator;

const router = Router();

router.get("/reservations", Reservation.getAllReservations);
router.get("/reservation/:id", Reservation.getByIdReservation);
router.post("/reservation", addRequestValidator, Reservation.createReservation);
router.put(
  "/reservation/:id",
  updateRequestValidator,
  Reservation.updateReservation
);
router.delete(
  "/reservation/:id",
  deleteRequestValidator,
  Reservation.deleteReservation
);

export default router;
