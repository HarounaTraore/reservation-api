import { Router } from "express";
import User from "../controllers/UserController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  getRequestValidator,
  updateRequestValidator,
} from "../validators/userValidator.js";
const router = Router();

router.get("/users", User.getAllUsers);
router.get("/user/:id", getRequestValidator, User.getByIdUser);
router.post("/user", addRequestValidator, User.createUser);
router.put("/user/:id", updateRequestValidator, User.updateUser);
router.delete("/user/:id",deleteRequestValidator, User.deleteUser);

export default router;
