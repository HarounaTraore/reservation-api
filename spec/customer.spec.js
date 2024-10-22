import {
  createCustomer,
  getByIdCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../src/services/customerService.js";

describe("Customer tests", () => {
  let customerId = null;

  it("can be created", async () => {
    const newCustomer = {
      name: "John Doe",
      address: "123 Main St",
      phone: "123-456-7890",
    };
    const { name, address, phone } = newCustomer;
    const result = await createCustomer(name, address, phone);

    customerId = result.id;

    expect(result).not.toBe(null);
    const customerCreate = await getByIdCustomer(customerId);
    expect(customerCreate.name).toEqual(newCustomer.name);
    expect(customerCreate.address).toEqual(newCustomer.address);
    expect(customerCreate.phone).toEqual(newCustomer.phone);
  });

  it("fails to create a customer with an existing phone", async () => {
    const newCustomer = {
      name: "Jane Doe",
      address: "456 Elm St",
      phone: "123-456-7890",
    };
    const { name, address, phone } = newCustomer;

    try {
      await createCustomer(name, address, phone);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain(
        "Unique constraint failed on the fields: (`phone`)",
      );
    }
  });

  it("can be updated", async () => {
    const updatedCustomer = {
      name: "John Smith",
      address: "789 Oak St",
      phone: "098-765-4321",
    };
    const { name, address, phone } = updatedCustomer;
    const updateResult = await updateCustomer(customerId, name, address, phone);

    const customerUpdated = await getByIdCustomer(customerId);
    expect(updateResult).not.toBe(null);
    expect(customerUpdated.name).toEqual(updatedCustomer.name);
    expect(customerUpdated.address).toEqual(updatedCustomer.address);
    expect(customerUpdated.phone).toEqual(updatedCustomer.phone);
  });

  it("fails to update a customer that does not exist", async () => {
    const invalidId = 1000000000;
    const updatedCustomer = {
      name: "Nonexistent Customer",
      address: "Unknown Address",
      phone: "000-000-0000",
    };
    const { name, address, phone } = updatedCustomer;

    try {
      await updateCustomer(invalidId, name, address, phone);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to update not found");
    }
  });

  it("can get all customers", async () => {
    const allCustomers = await getAllCustomers();

    expect(allCustomers).not.toBeNull();
    expect(allCustomers.length).toBeGreaterThan(0);
  });

  it("can be deleted", async () => {
    const result = await deleteCustomer(customerId);
    expect(result).toEqual(true);
    expect(await getByIdCustomer(customerId)).toEqual(null);
  });

  it("fails to delete a customer that does not exist", async () => {
    const invalidId = -111;

    try {
      await deleteCustomer(invalidId);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error.message).toContain("Record to delete does not exist");
    }
  });
});
