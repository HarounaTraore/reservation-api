import { Router } from "express";
import User from "../controllers/UserController.js";
import { addRequestValidator } from "../validators/userValidator.js";
const router = Router();

router.get("/users", User.getAllUsers);
router.get("/user/:id", User.getByIdUser);
router.post("/user", addRequestValidator, User.createUser);
router.put("/user/:id", User.updateUser);
router.delete("/user/:id", User.deleteUser);

export default router;
