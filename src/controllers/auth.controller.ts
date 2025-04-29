import {authService} from "@/services/auth.service";
import {LOGIN, REGISTER} from "@/types/user";
import {Context} from "elysia";

export const authController = {
  registerAccount: async ({body}: { body: REGISTER }) =>
    authService.registerAccount(body),
  loginAccount: async (context: Context) => {
    const body: LOGIN = context.body as LOGIN;
    return authService.loginAccount(body, context);
  },
  logoutAccount: async (context: Context) => authService.logoutAccount(context),
};
