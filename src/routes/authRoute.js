import { Router } from "express";
import { signin } from "../auth/authController.js";

const route = Router()
route.post("/login", signin)


export default route