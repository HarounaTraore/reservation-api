import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();

const destroys = async () => {
  try {
    await prisma.reservations.deleteMany();
    await prisma.customers.deleteMany();
    await prisma.rooms.deleteMany();
    await prisma.users.deleteMany();
    console.log("Base de données nettoyée");
    return true;
  } catch (error) {
    throw error;
  }
};

async function main() {
  const destroyData = await destroys();
  if (destroyData) {
    await prisma.users.createMany({
      data: [
        {
          name: "Admin",
          email: "admin@admin.com",
          address: "123 Admin St",
          phone: "30303030",
          password: `${await bcryptjs.hash("admin1234", 10)}`,
          role: "Admin",
          status: true,
        },
        {
          name: "Manager",
          email: "manager@manager.com",
          address: "123 Manager St",
          phone: "40404040",
          password: `${await bcryptjs.hash("manager1234", 10)}`,
          role: "Manager",
          status: true,
        },
      ],
    });
    console.log("Utilisateurs créés");

    // Seed pour les salles (10 salles)
    const rooms = [
      {
        name: "Conference Room 1",
        capacity: 50,
        equipment: "Projector, Whiteboard",
        status: "Non Réservée",
      },
      {
        name: "Conference Room 2",
        capacity: 30,
        equipment: "Projector, TV",
        status: "Maintenance",
      },
      {
        name: "Event Hall A",
        capacity: 200,
        equipment: "Stage, Lights, Sound System",
        status: "Non Réservée",
      },
      {
        name: "Meeting Room 1",
        capacity: 10,
        equipment: "TV",
        status: "Non Réservée",
      },
      {
        name: "Workshop Room",
        capacity: 20,
        equipment: "Computers, Whiteboard",
        status: "Non Réservée",
      },
      {
        name: "Event Hall B",
        capacity: 150,
        equipment: "Lights, Sound System",
        status: "Réservée",
      },
      {
        name: "Training Room",
        capacity: 25,
        equipment: "Projector",
        status: "Maintenance",
      },
      {
        name: "Lounge Room",
        capacity: 15,
        equipment: "Sofa, TV",
        status: "Non Réservée",
      },
      {
        name: "Board Room",
        capacity: 12,
        equipment: "TV, Whiteboard",
        status: "Non Réservée",
      },
      {
        name: "Auditorium",
        capacity: 300,
        equipment: "Stage, Sound System",
        status: "Réservée",
      },
    ];

    await prisma.rooms.createMany({ data: rooms });
    console.log("Salles créées");

    // Seed pour les clients (10 clients)
    const customers = [
      {
        name: "Customer One",
        address: "789 Customer Blvd",
        phone: "50505050",
      },
      {
        name: "Customer Two",
        address: "101 Customer Rd",
        phone: "60606060",
      },
      {
        name: "Customer Three",
        address: "102 Customer Ln",
        phone: "70707070",
      },
      {
        name: "Customer Four",
        address: "103 Customer Ln",
        phone: "80808080",
      },
      {
        name: "Customer Five",
        address: "104 Customer Ln",
        phone: "90909090",
      },
      {
        name: "Customer Six",
        address: "105 Customer Ln",
        phone: "50506060",
      },
      {
        name: "Customer Seven",
        address: "106 Customer Ln",
        phone: "60607070",
      },
      {
        name: "Customer Eight",
        address: "107 Customer Ln",
        phone: "70708080",
      },
      {
        name: "Customer Nine",
        address: "108 Customer Ln",
        phone: "80809090",
      },
      {
        name: "Customer Ten",
        address: "109 Customer Ln",
        phone: "90901010",
      },
    ];

    await prisma.customers.createMany({ data: customers });
    console.log("Clients créés");

    // Seed pour les réservations (10 réservations)
    const reservations = [
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 1)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 2)),
        roomId: 1,
        customerId: 1,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 3)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 4)),

        roomId: 2,
        customerId: 2,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 5)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 6)),
        userId: 1,
        roomId: 3,
        customerId: 3,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 7)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 8)),
        userId: 2,
        roomId: 4,
        customerId: 4,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 9)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 10)),
        userId: 1,
        roomId: 5,
        customerId: 5,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 11)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 12)),
        userId: 2,
        roomId: 6,
        customerId: 6,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 13)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 14)),
        userId: 1,
        roomId: 7,
        customerId: 7,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 15)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 16)),
        userId: 2,
        roomId: 8,
        customerId: 8,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 17)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 18)),
        userId: 1,
        roomId: 9,
        customerId: 9,
      },
      {
        dateReservation: new Date(),
        dateStart: new Date(new Date().setDate(new Date().getDate() + 19)),
        dateEnd: new Date(new Date().setDate(new Date().getDate() + 20)),
        userId: 2,
        roomId: 10,
        customerId: 10,
      },
    ];

    await prisma.reservations.createMany({ data: reservations });
    console.log("Réservations créées");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
