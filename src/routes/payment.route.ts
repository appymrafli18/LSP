import paymentController from "@/controllers/payment.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import Elysia from "elysia";

const paymentRoutes = new Elysia({ prefix: "/payments" });

paymentRoutes.onBeforeHandle(middlewareVerifyToken);
paymentRoutes.get("/count", paymentController.getTotalRevenuePayment);
paymentRoutes.get("/all/:uuid", paymentController.getAllPayment);
paymentRoutes.get("/select/:uuid", paymentController.getOnePayment);
paymentRoutes.post("/create", paymentController.createPayment);
paymentRoutes.put("/update/:uuid", paymentController.updatePayment);
paymentRoutes.delete("/delete/:uuid", paymentController.deletePayment);

export default paymentRoutes;
