import { authService } from "@/services/auth.service";
import { LOGIN } from "@/types/user";
import { Context } from "elysia";

export const authController = {
  loginAccount: async (context: Context) => {
    const body: LOGIN = context.body as LOGIN;
    return authService.loginAccount(body, context);
  },
  logoutAccount: async (context: Context) => authService.logoutAccount(context),
};
