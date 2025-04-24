import {middlewareVerifyToken} from "@/middleware/auth.middleware";
import Elysia from "elysia";
import activityController from "@/controllers/activity.controller";

const activityRoute = new Elysia({prefix: "/recently"});

activityRoute.onBeforeHandle(middlewareVerifyToken);
activityRoute.get("/all", activityController.getALlActivity);

export default activityRoute;
