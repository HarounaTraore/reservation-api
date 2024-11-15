import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();

const destroys = async () => {
  try {
    await prisma.reservations.deleteMany();
    await prisma.passwordReset.deleteMany();
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
          name: "Administrateur",
          email: "admin@admin.com",
          address: "123 Rue de l'Admin",
          phone: "30303030",
          password: await bcryptjs.hash("admin1234", 10),
          role: "Admin",
          status: true,
        },
        {
          name: "Manager",
          email: "manager@manager.com",
          address: "123 Rue du Manager",
          phone: "40404040",
          password: await bcryptjs.hash("manager1234", 10),
          role: "Manager",
          status: true,
        },
      ],
    });
    console.log("Utilisateurs créés");

    const rooms = [
      { name: "Salle de conférence 1", capacity: 50, equipment: "Projecteur, Tableau" },
      { name: "Salle de conférence 2", capacity: 30, equipment: "Projecteur, Télévision" },
      { name: "Grande salle A", capacity: 200, equipment: "Scène, Lumières, Sonorisation" },
      { name: "Salle de réunion 1", capacity: 10, equipment: "Télévision" },
      { name: "Salle d'atelier", capacity: 20, equipment: "Ordinateurs, Tableau" },
      { name: "Grande salle B", capacity: 150, equipment: "Lumières, Sonorisation" },
      { name: "Salle de formation", capacity: 25, equipment: "Projecteur" },
      { name: "Salle de détente", capacity: 15, equipment: "Canapés, Télévision" },
      { name: "Salle du conseil", capacity: 12, equipment: "Télévision, Tableau" },
      { name: "Auditorium", capacity: 300, equipment: "Scène, Sonorisation" },
    ];

    await prisma.rooms.createMany({ data: rooms });
    console.log("Salles créées");

    const customers = [
      { name: "Client Un", address: "789 Boulevard du Client", phone: "50505050" },
      { name: "Client Deux", address: "101 Rue du Client", phone: "60606060" },
      { name: "Client Trois", address: "102 Allée du Client", phone: "70707070" },
      { name: "Client Quatre", address: "103 Allée du Client", phone: "80808080" },
      { name: "Client Cinq", address: "104 Allée du Client", phone: "90909090" },
      { name: "Client Six", address: "105 Allée du Client", phone: "50506060" },
      { name: "Client Sept", address: "106 Allée du Client", phone: "60607070" },
      { name: "Client Huit", address: "107 Allée du Client", phone: "70708080" },
      { name: "Client Neuf", address: "108 Allée du Client", phone: "80809090" },
      { name: "Client Dix", address: "109 Allée du Client", phone: "90901010" },
    ];

    await prisma.customers.createMany({ data: customers });
    console.log("Clients créés");

    // Récupération des IDs des salles et clients
    const allRooms = await prisma.rooms.findMany();
    const allCustomers = await prisma.customers.findMany();

    // Création des réservations
    const reservations = allRooms.slice(0, 10).map((room, index) => ({
      dateReservation: new Date(),
      dateStart: new Date(new Date().setDate(new Date().getDate() + (index + 1))),
      dateEnd: new Date(new Date().setDate(new Date().getDate() + (index + 2))),
      roomId: room.id,
      customerId: allCustomers[index]?.id,
      status: index % 3 === 0 ? "PENDING" : index % 3 === 1 ? "CONFIRMED" : "CANCELED", // Exemple de statut
    }));

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
