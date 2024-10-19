import {
  createUser,
  deleteUser,
  getAllUsers,
  getByIdUser,
  updateUser,
} from "../services/userService.js";
import i18next from "i18next";

export default class User {
  static async getByIdUser(req, res, next) {
    try {
      const  id  = parseInt(req.params.id);
      const result = await getByIdUser(id);
      res.json({ result });
    } catch (error) {
      res.json({ message: i18next.t("userController.getUserById") });
    }
    next();
  }

  static async getAllUsers(_req, res, next) {
    try {
      const result = await getAllUsers();
      res.json({ result });
    } catch (error) {
      res.json({ message: i18next.t("userController.getAllUsersFailed") });
    }
    next();
  }

  static async createUser(req, res, next) {
    try {
      const { name, email, address, phone, password, role } = req.body;
      await createUser(name, email, address, phone, password, role);
      res
        .status(201)
        .json({ message: i18next.t("userController.createSuccfull") });
    } catch (error) {
      res.json({ message: i18next.t("userController.createFailed") });
    }
    next();
  }

  static async updateUser(req, res, next) {
    try {
      const  id  = Number(req.params.id);
      const { name, email, address, phone, password, role } = req.body;
      await updateUser(id, name, email, address, phone, password, role);
      res.json({ message: i18next.t("userController.updateSuccefull") });
    } catch (error) {
      res.json({ message: i18next.t("userController.updateFailed") });
    }
    next();
  }

  static async deleteUser(req, res, next) {
    try {
      const  id  = Number(req.params.id);
      await deleteUser(id);
      res.json({ message: i18next.t("userController.deleteSuccessful") });
    } catch (error) {
      res.json({ message: i18next.t("userController.deleteFailed") });
    }
    next();
  }
}
