import { Router } from "express";
import Room from "../controllers/RoomController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
} from "../validators/roomValidator.js";
const router = Router();

router.get("/rooms", Room.getAllRooms);
router.get("/room/:id", Room.getByIdRoom);
router.post("/room", addRequestValidator, Room.createRoom);
router.put("/room/:id", updateRequestValidator, Room.updateRoom);
router.delete("/room/:id", deleteRequestValidator, Room.deleteRoom);

export default router;
