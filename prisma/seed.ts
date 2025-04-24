import { prisma_connection } from "@/lib/prisma-orm";
import argon2 from "argon2";

async function main() {
  const admin = await prisma_connection.user.findUnique({
    where: {
      username: "admin",
    },
  });

  const hashingPassword = await argon2.hash("admin");

  if (!admin) {
    await prisma_connection.user.create({
      data: {
        name: "admin",
        username: "admin",
        email: "admin@gmail.com",
        password: hashingPassword,
        role: "Admin",
      },
    });
    console.log("ADMIN CREATED!");
  }

  // generate maskapai
  // for (let i = 1; i <= 5; i++) {
  //   const hashingPassword = await argon2.hash(`maskapai`);
  //   await prisma_connection.user.create({
  //     data: {
  //       name: `Maskapai ${i}`,
  //       username: `maskapai${i}`,
  //       email: `maskapai${i}@gmail.com`,
  //       password: hashingPassword,
  //       role: "Maskapai",
  //     },
  //   });
  //   console.log(`MASKAPAI ${i} CREATED!`);
  // }

  // generate user
  // for (let i = 1; i <= 5; i++) {
  //   const hashingPassword = await argon2.hash(`users`);
  //   await prisma_connection.user.create({
  //     data: {
  //       name: `User ${i}`,
  //       username: `user${i}`,
  //       email: `user${i}@gmail.com`,
  //       password: hashingPassword,
  //       role: "User",
  //     },
  //   });
  //   console.log(`USER ${i} CREATED!`);
  // }

  // generate airlines
  // for (let i = 1; i <= 5; i++) {
  //   const searchMaskapai = await prisma_connection.user.findFirst({
  //     where: {
  //       role: "Maskapai",
  //       email: `maskapai${i}@gmail.com`,
  //     },
  //   });

  //   if (searchMaskapai) {
  //     await prisma_connection.airlines.create({
  //       data: {
  //         name: `Airlines ${i}`,
  //         logo: `airlines${i}.png`,
  //         userId: searchMaskapai.id,
  //       },
  //     });
  //     console.log(`AIRLINES ${i} CREATED!`);

  //     const searchAirlines = await prisma_connection.airlines.findFirst({
  //       where: {
  //         userId: searchMaskapai.id,
  //       },
  //     });

  //     if (searchAirlines) {
  //       await prisma_connection.flights.create({
  //         data: {
  //           no_penerbangan: "CT12",
  //           kota_keberangkatan: "Jakarta",
  //           kota_tujuan: "Pekanbaru",
  //           waktu_keberangkatan: "2025-02-12T08:30:00Z",
  //           waktu_kedatangan: "2025-02-12T11:00:00Z",
  //           harga: 1000 * i,
  //           kapasitas_kursi: 100,
  //           kursi_tersedia: 70,
  //           airlinesId: searchAirlines.id,
  //         },
  //       });
  //       console.log(`FLIGHTS ${i} CREATED!`);
  //     }
  //   }
  // }

  // generate bookings
  // for (let i = 1; i <= 5; i++) {
  //   const searchUser = await prisma_connection.user.findFirst({
  //     where: {
  //       role: "User",
  //       email: `user${i}@gmail.com`,
  //     },
  //   });

  //   if (searchUser) {
  //     const searchFlight = await prisma_connection.flights.findFirst({
  //       where: {
  //         no_penerbangan: "CT12",
  //       },
  //     });

  //     if (searchFlight) {
  //       await prisma_connection.booking.create({
  //         data: {
  //           jumlah_kursi: 1,
  //           total_harga: searchFlight.harga.toNumber(),
  //           flightId: searchFlight.id,
  //           userId: searchUser.id,
  //         },
  //       });
  //       console.log(`BOOKINGS ${i} CREATED!`);
  //     }
  //   }
  // }

  console.log("SEEDING DONE!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma_connection.$disconnect();
  });
