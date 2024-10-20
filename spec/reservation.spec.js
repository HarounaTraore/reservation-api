import {
  createReservation,
  getByIdReservation,
  updateReservation,
  deleteReservation,
  getAllReservations,
} from "../src/services/reservationService.js";

describe("Reservation tests", () => {
  let reservationId = null;

  it("can be created", async () => {
    const newReservation = {
      dateReservation: "2024-10-20",
      dateStart: "2024-10-25",
      dateEnd: "2024-10-26",
      userId: 11,
      roomId: 13,
      customerId: 5,
    };
    const { dateReservation, dateStart, dateEnd, userId, roomId, customerId } =
      newReservation;
    const result = await createReservation(
      dateReservation,
      dateStart,
      dateEnd,
      userId,
      roomId,
      customerId
    );

    reservationId = result.id;

    expect(await getByIdReservation(reservationId)).toEqual({
      id: reservationId,
      dateReservation: result.dateReservation,
      dateStart: result.dateStart,
      dateEnd: result.dateEnd,
      userId: newReservation.userId,
      roomId: newReservation.roomId,
      customerId: newReservation.customerId,
    });
  });

  it("fails to create a reservation with an invalid room or customer", async () => {
    const newReservation = {
      dateReservation: "2024-10-20T00:00:00.000Z",
      dateStart: "2024-10-25T00:00:00.000Z",
      dateEnd: "2024-10-26T00:00:00.000Z",
      userId: 11,
      roomId: 999,
      customerId: 999,
    };
    const { dateReservation, dateStart, dateEnd, userId, roomId, customerId } =
      newReservation;

    try {
      await createReservation(
        dateReservation,
        dateStart,
        dateEnd,
        userId,
        roomId,
        customerId
      );
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Foreign key constraint violated");
    }
  });

  it("can be updated", async () => {
    const updatedReservation = {
      dateReservation: "2024-10-20",
      dateStart: "2024-10-25",
      dateEnd: "2024-10-26",
      userId: 11,
      roomId: 13,
      customerId: 5,
    };
    const { dateReservation, dateStart, dateEnd, userId, roomId, customerId } =
      updatedReservation;
    const updateResult = await updateReservation(
      reservationId,
      dateReservation,
      dateStart,
      dateEnd,
      userId,
      roomId,
      customerId
    );

    expect(updateResult).not.toBe(null);
    expect(await getByIdReservation(reservationId)).toEqual({
      id: reservationId,
      dateReservation: updateResult.dateReservation,
      dateStart: updateResult.dateStart,
      dateEnd: updateResult.dateEnd,
      userId: updatedReservation.userId,
      roomId: updatedReservation.roomId,
      customerId: updatedReservation.customerId,
    });
  });

  it("fails to update a reservation that does not exist", async () => {
    const invalidId = 1000000000;
    const updatedReservation = {
      dateReservation: new Date().toISOString(),
      dateStart: new Date(Date.now()).toISOString(),
      dateEnd: new Date(Date.now()).toISOString(),
      userId: 1,
      roomId: 1,
      customerId: 1,
    };
    const { dateReservation, dateStart, dateEnd, userId, roomId, customerId } =
      updatedReservation;

    try {
      await updateReservation(
        invalidId,
        dateReservation,
        dateStart,
        dateEnd,
        userId,
        roomId,
        customerId
      );
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to update not found");
    }
  });

  it("can get all reservations", async () => {
    const allReservations = await getAllReservations();

    expect(allReservations).not.toBeNull();
    expect(allReservations.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await deleteReservation(reservationId);
    expect(result).toEqual(true);
    expect(await getByIdReservation(reservationId)).toEqual(null);
  });

  it("fails to delete a reservation that does not exist", async () => {
    const invalidId = -111;

    try {
      await deleteReservation(invalidId);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to delete does not exist");
    }
  });
});