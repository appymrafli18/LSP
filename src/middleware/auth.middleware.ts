import { verifyToken } from "@/lib/auth";
import { IPayload } from "@/types/jwt";
import { Context } from "elysia";

interface ICustomContext extends Context {
  store: {
    user?: IPayload;
  };
}

export const middlewareVerifyToken = async (context: ICustomContext) => {
  const token = context.cookie.token.value;
  if (!token) return { statusCode: 401, message: "Unauthorized" };

  const decoded = verifyToken(token) as IPayload;
  if (!decoded) return { statusCode: 401, message: "Token Tidak Valid" };

  // (context.store as { user: IPayload }).user = decoded;
  context.store.user = decoded;
};
