import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getByIdCustomer,
  updateCustomer,
} from "../services/customerService.js";
import i18next from "i18next";

export default class Customer {
  static async getByIdCustomer(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await getByIdCustomer(id);
      res.json({ result });
    } catch (error) {
      res.json({ message: i18next.t("customerController.getCustomerById") });
    }
    next();
  }

  static async getAllCustomers(_req, res, next) {
    try {
      const result = await getAllCustomers();
      res.json({ result });
    } catch (error) {
      res.json({
        message: i18next.t("customerController.getAllCustomersFailed"),
      });
    }
    next();
  }

  static async createCustomer(req, res, next) {
    try {
      const { name, address, phone, userId } = req.body;
      await createCustomer(name, address, phone, userId);
      res
        .status(201)
        .json({ message: i18next.t("customerController.createSuccfull") });
    } catch (error) {
      res.json({ message: i18next.t("customerController.createFailed") });
    }
    next();
  }

  static async updateCustomer(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { name, address, phone, userId } = req.body;
      await updateCustomer(id, name, address, phone, userId);
      res.json({ message: i18next.t("customerController.updateSuccefull") });
    } catch (error) {
      res.json({ message: i18next.t("customerController.updateFailed") });
    }
    next();
  }

  static async deleteCustomer(req, res, next) {
    try {
      const id = Number(req.params.id);
      await deleteCustomer(id);
      res.json({ message: i18next.t("customerController.deleteSuccessful") });
    } catch (error) {
      res.json({ message: i18next.t("customerController.deleteFailed") });
    }
    next();
  }
}
