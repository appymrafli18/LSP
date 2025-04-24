import bookingController from "@/controllers/booking.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import Elysia from "elysia";

const bookingRoutes = new Elysia({ prefix: "/bookings" });

bookingRoutes.onBeforeHandle(middlewareVerifyToken);
bookingRoutes.get("/all", bookingController.getAllBookings);
bookingRoutes.get("/filter", bookingController.getFilterBookings);
bookingRoutes.get("/count", bookingController.getTotalBooking);
bookingRoutes.get("/select/:uuid", bookingController.getOneBooking);
bookingRoutes.post("/create", bookingController.createBookings);
bookingRoutes.post("/update/:uuid", bookingController.updateBookings);
bookingRoutes.delete("/delete/:uuid", bookingController.deleteBookings);

export default bookingRoutes;
