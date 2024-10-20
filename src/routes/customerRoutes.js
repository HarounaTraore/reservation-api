import { Router } from "express";
import Customer from "../controllers/CustomerController.js";
import {
  addRequestValidator,
  deleteRequestValidator,
  updateRequestValidator,
} from "../validators/customerValidator.js";
const router = Router();

router.get("/customers", Customer.getAllCustomers);
router.get("/customer/:id", Customer.getByIdCustomer);
router.post("/customer", addRequestValidator, Customer.createCustomer);
router.put("/customer/:id", updateRequestValidator, Customer.updateCustomer);
router.delete("/customer/:id", deleteRequestValidator, Customer.deleteCustomer);

export default router;
