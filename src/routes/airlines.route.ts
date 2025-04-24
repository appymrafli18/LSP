import airlinesController from "@/controllers/airlines.controller";
import { middlewareVerifyToken } from "@/middleware/auth.middleware";
import Elysia from "elysia";

const airlinesRoutes = new Elysia({ prefix: "/airlines" });

airlinesRoutes.onBeforeHandle(middlewareVerifyToken);
airlinesRoutes.get("/all", airlinesController.getAllAirlines);
airlinesRoutes.post("/create", airlinesController.createAirlines);
airlinesRoutes.get("/select/:uuid", airlinesController.getSelectedAirlines);
airlinesRoutes.put("/update/:uuid", airlinesController.updateAirlines);
airlinesRoutes.delete("/delete/:uuid", airlinesController.deleteAirlines);

export default airlinesRoutes;
