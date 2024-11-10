import { Router } from "express";
import Room from "../controllers/RoomController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  getRequestValidator,
  updateRequestValidator,
} from "../validators/roomValidator.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = Router();

router.get(
  "/rooms",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  Room.getAllRooms,
);
router.get(
  "/room/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  getRequestValidator,
  Room.getByIdRoom,
);
router.get(
  "/rooms/not-reserved",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  Room.romsNotReserved,
);
router.post(
  "/room",
  authenticateJWT,
  authorizeRoles("Admin"),
  addRequestValidator,
  Room.createRoom,
);
router.put(
  "/room/:id",
  authenticateJWT,
  authorizeRoles("Admin", "Manager"),
  updateRequestValidator,
  Room.updateRoom,
);
router.delete(
  "/room/:id",
  authenticateJWT,
  authorizeRoles("Admin"),
  deleteRequestValidator,
  Room.deleteRoom,
);

export default router;
