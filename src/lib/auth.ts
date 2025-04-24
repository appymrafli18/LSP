import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { IPayload } from "@/types/jwt";

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(password: string, hashPassword: string) {
  return await argon2.verify(hashPassword, password);
}

export function generateToken(payload: IPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export function verifyToken(token: string): IPayload | null {
  try {
    const tox = jwt.verify(token, process.env.JWT_SECRET!) as IPayload;
    return tox;
  } catch (error: unknown) {
    return error instanceof Error ? null : null;
  }
}
