import { Router } from "express";
import User from "../controllers/UserController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  getRequestValidator,
  updateRequestValidator,
} from "../validators/userValidator.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = Router();

router.get(
  "/users",
  // authenticateJWT,
  // authorizeRoles("Admin"),
  User.getAllUsers
);
router.get(
  "/user/:id",
  // authenticateJWT,
  // authorizeRoles("Admin"),
  getRequestValidator,
  User.getByIdUser
);
router.post(
  "/user",
  // authenticateJWT,
  // authorizeRoles("Admin"),
  addRequestValidator,
  User.createUser
);
router.put(
  "/user/:id",
  // authenticateJWT,
  // authorizeRoles("Admin"),
  updateRequestValidator,
  User.updateUser
);
router.delete(
  "/user/:id",
  // authenticateJWT,
  // authorizeRoles("Admin"),
  deleteRequestValidator,
  User.deleteUser
);

export default router;
