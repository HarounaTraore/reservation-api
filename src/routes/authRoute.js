import { Router } from "express";
import { forgotPwd, resetPassword, signin } from "../auth/authController.js";

const route = Router();
route.post("/login", signin);
route.post("/forgot-password",forgotPwd)
route.post("/reset-password", resetPassword)
export default route;
