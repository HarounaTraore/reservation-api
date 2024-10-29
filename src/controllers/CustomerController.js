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
      if (result) {
        res.status(200).json({ result });
      } else {
        res
          .status(404)
          .json({ message: i18next.t("customerController.getCustomerById") });
      }
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
      res.status(404).json({
        message: i18next.t("customerController.getAllCustomersFailed"),
      });
    }
    next();
  }

  static async createCustomer(req, res, next) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { name, address, phone } = req.body;
      await createCustomer(name, address, phone, token);
      res
        .status(201)
        .json({ message: i18next.t("customerController.createSuccfull") });
    } catch (error) {
      res.status(400).json({
        message: i18next.t("customerController.createFailed"),
        error: error.message,
      });
    }
    next();
  }

  static async updateCustomer(req, res, next) {
    try {
      const id = Number(req.params.id);
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { name, address, phone } = req.body;
      await updateCustomer(id, name, address, phone, token);
      res.json({ message: i18next.t("customerController.updateSuccefull") });
    } catch (error) {
      res
        .status(400)
        .json({ message: i18next.t("customerController.updateFailed"), error: error.message });
    }
    next();
  }

  static async deleteCustomer(req, res, next) {
    try {
      const id = Number(req.params.id);
      await deleteCustomer(id);
      res.json({ message: i18next.t("customerController.deleteSuccessful") });
    } catch (error) {
      res.status(400).json({ message: i18next.t("customerController.deleteFailed"), error: error.message });
    }
    next();
  }
}
