import { Router } from "express";
import Customer from "../controllers/CustomerController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
  getRequestValidator,
} from "../validators/customerValidator.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
const router = Router();
import authenticateJWT from "../middlewares/authenticateJWT.js";

router.get(
  "/customers",
  // authenticateJWT,
  // authorizeRoles("Admin", "Manager"),
  Customer.getAllCustomers,
);
router.get(
  "/customer/:id",
  // authenticateJWT,
  // authorizeRoles("Admin", "Manager"),
  getRequestValidator,
  Customer.getByIdCustomer,
);
router.post(
  "/customer",
  // authenticateJWT,
  // authorizeRoles("Admin", "Manager"),
  addRequestValidator,
  Customer.createCustomer,
);
router.put(
  "/customer/:id",
  // authenticateJWT,
  // authorizeRoles("Admin", "Manager"),
  updateRequestValidator,
  Customer.updateCustomer,
);
router.delete(
  "/customer/:id",
  // authenticateJWT,
  // authorizeRoles("Admin", "Manager"),
  deleteRequestValidator,
  Customer.deleteCustomer,
);

export default router;
