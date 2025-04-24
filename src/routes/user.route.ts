import { userController } from "@/controllers/user.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import { Role } from "@prisma/client";
import Elysia, { t } from "elysia";

const userRoutes = new Elysia({ prefix: "/user" });

userRoutes.onBeforeHandle(middlewareVerifyToken);
userRoutes.get("/all/:role", userController.getUsers);
userRoutes.get("/select/:uuid", userController.getOneUser);
userRoutes.get("/me", userController.getMeUser);
userRoutes.get("/count", userController.getTotalUser);
userRoutes.post("/create", userController.createUser, {
  body: t.Object({
    name: t.String(),
    username: t.String(),
    email: t.String(),
    password: t.String(),
    role: t.Enum(Role),
  }),
});
userRoutes.put("/update/:uuid", userController.updateUser, {
  params: t.Object({
    uuid: t.String({ format: "uuid" }),
  }),
  body: t.Object({
    name: t.Optional(t.String()),
    username: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
    role: t.Optional(t.Enum(Role)),
  }),
});
userRoutes.put("/update/me", userController.updateMe, {
  body: t.Object({
    name: t.Optional(t.String()),
    username: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
  }),
});
userRoutes.delete("/delete/:uuid", userController.deleteUser);

export default userRoutes;
