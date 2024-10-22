import {
  createUser,
  deleteUser,
  getAllUsers,
  getByIdUser,
  updateUser,
} from "../src/services/userService.js";

describe("User tests", () => {
  let userId = null;
  const increment = parseInt(Math.random(1000) * 1000);

  it("can be created", async () => {
    const newUser = {
      name: "First User",
      email: `use${increment}@gmail.com`,
      address: "NKTT, 2024C",
      phone: `1245${increment}678`,
      password: "passwordUser",
      role: "Admin",
    };
    const { name, email, address, phone, password, role } = newUser;
    const result = await createUser(
      name,
      email,
      address,
      phone,
      password,
      role,
    );

    userId = result.id;

    expect(result).not.toBe(null);
    const newU = await getByIdUser(userId);
    expect(newU.name).toEqual(newUser.name);
  });

  it("fails to create a user with an existing email", async () => {
    const newUser = {
      name: "First User",
      email: "use@gmail.com",
      address: "NKTT, 2024C",
      phone: "1245678",
      password: "passwordUser",
      role: "Admin",
    };
    const { name, email, address, phone, password, role } = newUser;

    try {
      await createUser(name, email, address, phone, password, role);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain(
        "Unique constraint failed on the fields: (`email`)",
      );
    }
  });

  it("can be updated", async () => {
    const user = {
      name: "Mr Gestionnaire",
      email: `use${increment + 5}@gmail.com`,
      address: "NKTT, Basra",
      phone: `1245${increment + 5}678`,
      password: "POSEIDON",
      role: "Gestionnaire",
    };
    const { name, email, address, phone, password, role } = user;
    const updateResult = await updateUser(
      userId,
      name,
      email,
      address,
      phone,
      password,
      role,
    );

    expect(updateResult).not.toBe(null);
    const emailExist = await getByIdUser(userId);
    expect(emailExist.email).toEqual(email);
  });

  it("fails to update a user that does not exist", async () => {
    const invalidId = 1000000000;
    const user = {
      name: "Mr Gestionnaire",
      email: "use@gmail.com",
      address: "NKTT, Basra",
      phone: "40000000",
      password: "POSEIDON",
      role: "Gestionnaire",
    };
    const { name, email, address, phone, password, role } = user;

    try {
      await updateUser(invalidId, name, email, address, phone, password, role);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to update not found");
    }
  });

  it("can get all user", async () => {
    const allUsers = await getAllUsers();

    expect(allUsers).not.toBeNull();
    expect(allUsers.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await deleteUser(userId);
    expect(result).toEqual(true);
    expect(await getByIdUser(userId)).toEqual(null);
  });

  it("fails to delete a user that does not exist", async () => {
    const invalidId = -111;

    try {
      await deleteUser(invalidId);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to delete does not exist");
    }
  });
});
