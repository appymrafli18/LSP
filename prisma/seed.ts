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

  console.log("SEEDING DONE!");
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma_connection.$disconnect();
  });
