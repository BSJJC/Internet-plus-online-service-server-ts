import { Router } from "express";
import {
  registerAdministrator,
  loginAdministrator,
  getAdministratoreData,
} from "../controllers/administratorController";
import protect from "../middleware/authMiddleware";

const administratorRouter = Router();

administratorRouter.post("/", registerAdministrator);
administratorRouter.post("/login", loginAdministrator);
administratorRouter.get("/administratorData", protect, getAdministratoreData);

export default administratorRouter;
