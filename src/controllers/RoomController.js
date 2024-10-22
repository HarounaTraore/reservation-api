import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getByIdRoom,
  updateRoom,
} from "../services/roomService.js";
import i18next from "i18next";

export default class Room {
  static async getByIdRoom(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const result = await getByIdRoom(id);
      if (result) {
        res.status(200).json({ result });
      } else {
        res
          .status(404)
          .json({ message: i18next.t("roomController.getRoomById") });
      }
    } catch (error) {
      res.json({ message: i18next.t("roomController.getRoomById") });
    }
    next();
  }

  static async getAllRooms(_req, res, next) {
    try {
      const result = await getAllRooms();
      res.json({ result });
    } catch (error) {
      res.json({ message: i18next.t("roomController.getAllRoomsFailed") });
    }
    next();
  }

  static async createRoom(req, res, next) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { name, capacity, equipment, status } = req.body;
      await createRoom(name, capacity, equipment, status, token);
      res
        .status(201)
        .json({ message: i18next.t("roomController.createSuccfull") });
    } catch (error) {
      res.json({ message: i18next.t("roomController.createFailed") });
    }
    next();
  }

  static async updateRoom(req, res, next) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const id = Number(req.params.id);
      const { name, capacity, equipment, status } = req.body;
      await updateRoom(id, name, capacity, equipment, status, token);
      res.json({ message: i18next.t("roomController.updateSuccefull") });
    } catch (error) {
      res.json({ message: i18next.t("roomController.updateFailed") });
    }
    next();
  }

  static async deleteRoom(req, res, next) {
    try {
      const id = Number(req.params.id);
      await deleteRoom(id);
      res.json({ message: i18next.t("roomController.deleteSuccessful") });
    } catch (error) {
      res.json({ message: i18next.t("roomController.deleteFailed") });
    }
    next();
  }
}
