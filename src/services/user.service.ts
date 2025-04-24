import { hashPassword } from "@/lib/auth";
import { converterError } from "@/lib/convert-validation";
import { prisma_connection } from "@/lib/prisma-orm";
import { createUserSchema } from "@/lib/validation-user";
import { IPayload } from "@/types/jwt";
import { USER } from "@/types/user";
import { Role } from "@prisma/client";
import argon2 from "argon2";

export const userServices = {
  getAllUser: async (role: string, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };

    if (!(role in Role))
      return { statusCode: 400, message: "Invalid Selected Path" };
    try {
      const user = await prisma_connection.user.findMany({
        where: {
          role: role as Role,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user.length) return { statusCode: 404, message: "User not found" };
      return { statusCode: 200, message: "Success", data: user };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getOneUser: async (uuid: string, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };

    try {
      const user = await prisma_connection.user.findUnique({
        where: {
          uuid,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) return { statusCode: 404, message: "User not found" };
      return { statusCode: 200, message: "Success", data: user };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getMeUser: async (user: IPayload) => {
    try {
      const response = await prisma_connection.user.findUnique({
        where: {
          id: user.id,
        },
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!response) return { statusCode: 404, message: "User not found" };

      return { statusCode: 200, message: "Success", data: response };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  getTotalUser: async (user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const user = await prisma_connection.user.count();
      if (!user) return { statusCode: 404, message: "Not Have User" };
      return { statusCode: 200, message: "Success", data: user };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  createUser: async (body: USER, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const { error, data } = createUserSchema.safeParse(body);

      if (error)
        return {
          statusCode: 400,
          message: "Validation Error",
          error: converterError(error),
        };
      // 🔍 Cek duplikasi username atau email sebelum insert
      const existingUser = await prisma_connection.user.findFirst({
        where: { OR: [{ username: data.username }, { email: data.email }] },
        select: { username: true, email: true },
      });

      if (existingUser) {
        return {
          statusCode: 400,
          message: "Unique constraint error",
          error: {
            ...(existingUser.username === data.username && {
              username: "Username sudah digunakan",
            }),
            ...(existingUser.email === data.email && {
              email: "Email sudah digunakan",
            }),
          },
        };
      }

      const hashingPassword = await argon2.hash(data.password as string);

      await prisma_connection.user.create({
        data: {
          name: data.name,
          username: data.username,
          email: data.email,
          role: data.role as Role,
          password: hashingPassword,
        },
      });

      return { statusCode: 201, message: "User Created Successfully" };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Terjadi Kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
  updateMe: async (body: USER, user: IPayload) => {
    try {
      const search = await prisma_connection.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!search) return { statusCode: 404, message: "User not found" };

      const updatedData = {
        ...search,
        ...Object.fromEntries(
          Object.keys(body).map((key) => [
            key,
            body[key as keyof USER] || search[key as keyof USER],
          ])
        ),
        password: body.password
          ? await hashPassword(body.password)
          : search.password,
      };

      await prisma_connection.user.update({
        where: {
          id: search.id,
        },
        data: updatedData,
      });

      return { statusCode: 200, message: "Success updated data user" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  updateUser: async (uuid: string, body: USER, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const search = await prisma_connection.user.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return { statusCode: 404, message: "User not found" };

      const updatedData = {
        ...search,
        ...Object.fromEntries(
          Object.keys(body).map((key) => [
            key,
            body[key as keyof USER] || search[key as keyof USER],
          ])
        ),
        password: body.password
          ? await hashPassword(body.password)
          : search.password,
        role: body.role ? (body.role as Role) : search.role,
      };

      await prisma_connection.user.update({
        where: {
          id: search.id,
        },
        data: updatedData,
      });

      return { statusCode: 200, message: "Success updated data user" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  deleteUser: async (uuid: string, user: IPayload) => {
    if (user.role !== "Admin")
      return { statusCode: 401, message: "Unauthorized" };
    try {
      const search = await prisma_connection.user.findUnique({
        where: {
          uuid,
        },
      });

      if (!search) return { statusCode: 404, message: "User not found" };

      await prisma_connection.booking.deleteMany({
        where: {
          userId: search.id, // Sesuaikan dengan nama kolom foreign key
        },
      });
      await prisma_connection.user.delete({
        where: {
          id: search.id,
        },
      });

      return { statusCode: 200, message: "Success deleted data user" };
    } catch (error) {
      return {
        statusCode: 400,
        message: "Terjadi kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};
