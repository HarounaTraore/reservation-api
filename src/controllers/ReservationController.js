import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getByIdReservation,
  updateReservation,
} from "../services/reservationService.js";
import i18next from "i18next";

export default class Reservation {
  static async getByIdReservation(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await getByIdReservation(id);
      if (result) {
        res.status(200).json({ result });
      } else {
        res.status(404).json({
          message: i18next.t("reservationController.getReservationById"),
        });
      }
    } catch (error) {
      res.status(500).json({
        message: i18next.t("reservationController.getReservationById"),
      });
    }
  }

  static async getAllReservations(_req, res) {
    try {
      const result = await getAllReservations();
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({
        message: i18next.t("reservationController.getAllReservationsFailed"),
      });
    }
  }

  static async createReservation(req, res) {
    try {
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { dateReservation, dateStart, dateEnd, roomId, customerId, status } =
        req.body;
        const statusUpercase = status.toUpperCase()
      await createReservation(
        dateReservation,
        dateStart,
        dateEnd,
        roomId,
        customerId,
        statusUpercase,
        token,
      );
      res
        .status(201)
        .json({ message: i18next.t("reservationController.createSuccfull") });
    } catch (error) {
      res
        .status(500)
        .json({ message: i18next.t("roomController.createFailed"), error: error.message });
    }
  }

  static async updateReservation(req, res) {
    try {
      const id = Number(req.params.id);
      let token = null;
      const authHeader = req.headers.authorization;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      const { dateReservation, dateStart, dateEnd, roomId, customerId, status } =
        req.body;
        const statusUpercase = status.toUpperCase()

      await updateReservation(
        id,
        dateReservation,
        dateStart,
        dateEnd,
        roomId,
        customerId,
        statusUpercase,
        token,
      );
      res
        .status(200)
        .json({ message: i18next.t("reservationController.updateSuccefull") });
    } catch (error) {
      if (error.code === "P2025") {
        res.status(404).json({
          message: i18next.t("reservationController.existReservation"),
        });
      }
      res.status(500).json({ message: error });
    }
  }

  static async deleteReservation(req, res) {
    try {
      const id = Number(req.params.id);
      await deleteReservation(id);
      res
        .status(200)
        .json({ message: i18next.t("reservationController.deleteSuccessful") });
    } catch (error) {
      res
        .status(404)
        .json({ message: i18next.t("reservationController.deleteFailed") });
    }
  }
}
