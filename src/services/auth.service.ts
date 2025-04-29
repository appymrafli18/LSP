import {converterError} from "@/lib/convert-validation";
import {prisma_connection} from "@/lib/prisma-orm";
import {loginSchema, userSchema} from "@/lib/validation-user";
import {IPayload} from "@/types/jwt";
import {LOGIN, REGISTER} from "@/types/user";
import argon2 from "argon2";
import {type Context} from "elysia";
import jwt from "jsonwebtoken";

export const authService = {
  generateToken: (payload: object) =>
    jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: "1h"}),


  registerAccount: async (body: REGISTER) => {
    try {
      const {error, data} = userSchema.safeParse(body);

      if (error)
        return {
          statusCode: 400,
          message: "Validation Error",
          error: converterError(error),
        };

      // 🔍 Cek duplikasi username atau email sebelum insert
      const existingUser = await prisma_connection.user.findFirst({
        where: {OR: [{username: data.username}, {email: data.email}]},
        select: {username: true, email: true},
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

      const hashingPassword = await argon2.hash(data.password);

      await prisma_connection.user.create({
        data: {
          name: data.name,
          username: data.username,
          email: data.email,
          password: hashingPassword,
        },
      });

      return {statusCode: 201, message: "User Created Successfully"};
    } catch (error) {
      return {
        statusCode: 500,
        message: "Terjadi Kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  loginAccount: async (body: LOGIN, context: Context) => {
    try {
      const {error, data} = loginSchema.safeParse(body);

      if (error)
        return {
          statusCode: 400,
          message: "Validation Error",
          error: converterError(error),
        };

      const user = await prisma_connection.user.findUnique({
        where: {email: data.email},
      });

      if (!user)
        return {statusCode: 404, message: "Account Not Registerated"};

      const isMatch = await argon2.verify(user.password, data.password);

      if (!isMatch) return {statusCode: 401, message: "Invalid Password"};

      const payload: IPayload = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = authService.generateToken(payload);

      context.cookie.token.set({
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });

      return {statusCode: 200, message: "Success Login", token};
    } catch (error) {
      return {
        statusCode: 500,
        message: "Terjadi Kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },

  logoutAccount: async (context: Context) => {
    try {
      if (!context.cookie.token.value)
        return {statusCode: 401, message: "Please Login First !"};

      context.cookie.token.remove();

      return {
        statusCode: 200,
        message: "Success Logout",
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: "Terjadi Kesalahan Internal",
        error: (error as Error).message,
      };
    }
  },
};
