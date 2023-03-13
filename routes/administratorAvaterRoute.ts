import { Router } from "express";
import uploadAvater from "../middleware/avaterUploadMiddleware";
import {
  uploadAdministratorAvater,
  getAdministratorAvater,
} from "../controllers/administratorAvaterController";

const administratorAvaterRoute = Router();

administratorAvaterRoute.post(
  "/upload",
  uploadAvater.single("avater"),
  uploadAdministratorAvater
);


administratorAvaterRoute.get("/", getAdministratorAvater);

export default administratorAvaterRoute;
