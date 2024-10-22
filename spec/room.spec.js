import {
  createRoom,
  getByIdRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
} from "../src/services/roomService.js";

describe("Room tests", () => {
  let roomId = null;

  it("can be created", async () => {
    const newRoom = {
      name: "Room 005",
      capacity: 60,
      equipment: "Projector, wifi, 75 chairs",
      status: "Not Reserved",
    };
    const { name, capacity, equipment, status } = newRoom;
    const result = await createRoom(name, capacity, equipment, status);

    roomId = result.id;
    const nameRoom = await getByIdRoom(roomId);
    expect(result).not.toBe(null);
    expect(nameRoom.name).toEqual(name);
  });

  it("fails to create a room with an existing name", async () => {
    const newRoom = {
      name: "Room 005",
      capacity: 60,
      equipment: "Projector, wifi, 75 chairs",
      status: "Not Reserved",
    };
    const { name, capacity, equipment, status } = newRoom;

    try {
      await createRoom(name, capacity, equipment, status);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain(
        "Unique constraint failed on the fields: (`name`)",
      );
    }
  });

  it("can be updated", async () => {
    const updatedRoom = {
      name: "Room 006",
      capacity: 70,
      equipment: "Projector, wifi, 80 chairs",
      status: "Reserved",
    };
    const { name, capacity, equipment, status, userId } = updatedRoom;
    const updateResult = await updateRoom(
      roomId,
      name,
      capacity,
      equipment,
      status,
    );
    const nameRoom = await getByIdRoom(roomId);
    expect(updateResult).not.toBe(null);
    expect(nameRoom.name).toEqual(name);
  });

  it("fails to update a room that does not exist", async () => {
    const invalidId = 1000000000;
    const updatedRoom = {
      name: "Room 007",
      capacity: 80,
      equipment: "Projector, wifi, 90 chairs",
      status: "Reserved",
    };
    const { name, capacity, equipment, status } = updatedRoom;

    try {
      await updateRoom(invalidId, name, capacity, equipment, status);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to update not found");
    }
  });

  it("can get all rooms", async () => {
    const allRooms = await getAllRooms();

    expect(allRooms).not.toBeNull();
    expect(allRooms.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await deleteRoom(roomId);
    expect(result).toEqual(true);
    expect(await getByIdRoom(roomId)).toEqual(null);
  });

  it("fails to delete a room that does not exist", async () => {
    const invalidId = -111;

    try {
      await deleteRoom(invalidId);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to delete does not exist");
    }
  });
});
