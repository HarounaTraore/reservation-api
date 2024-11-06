import {
  createUser,
  deleteUser,
  getAllUsers,
  getByIdUser,
  updateCurrentUser,
  updatePwdCurrentUser,
  updateUser,
} from "../services/userService.js";
import i18next from "i18next";

export default class User {
  static async getByIdUser(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await getByIdUser(id);
      if (result) {
        res.status(200).json({ result });
      } else {
        res
          .status(404)
          .json({ message: i18next.t("userController.getUserById") });
      }
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
      const id = Number(req.params.id);
      const { name, email, address, phone, password, role } = req.body;
      await updateUser(id, name, email, address, phone, password, role);
      res.json({ message: i18next.t("userController.updateSuccefull") });
    } catch (error) {
      res.json({ message: i18next.t("userController.updateFailed") });
    }
    next();
  }
  static async updateCurrentUser(req, res) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { name, email, address, phone } = req.body;

      await updateCurrentUser(name, email, address, phone, token);
      res.json({ message: i18next.t("userController.updateSuccefull") });
    } catch (error) {
      res.json({
        message: i18next.t("userController.updateFailed"),
        error: error.message,
      });
    }
  }
  static async updatePwdCurrentUser(req, res) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { oldPassword, newPassword } = req.body;
      await updatePwdCurrentUser(oldPassword, newPassword, token);
      res.json({ message: i18next.t("userController.updateSuccefull") });
    } catch (error) {
      res.json({
        message: i18next.t("userController.updateFailed"),
        error: error.message,
      });
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const id = Number(req.params.id);
      await deleteUser(id);
      res.json({ message: i18next.t("userController.deleteSuccessful") });
    } catch (error) {
      res.json({ message: i18next.t("userController.deleteFailed") });
    }
    next();
  }
}
