import { authController } from "@/controllers/auth.controller";
import Elysia, { t } from "elysia";

const authRoutes = new Elysia({ prefix: "/auth" });

authRoutes.post("/register", authController.registerAccount);
authRoutes.post("/login", authController.loginAccount, {
  body: t.Object({ email: t.String(), password: t.String() }),
});
authRoutes.post('/logout', authController.logoutAccount);

export default authRoutes;
