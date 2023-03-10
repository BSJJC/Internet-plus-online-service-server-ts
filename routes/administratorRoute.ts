import { Router } from "express";
import {
  registerAdministrator,
  loginAdministrator,
} from "../controllers/administratorController";

const router = Router();

router.post("/", registerAdministrator);
router.post("/login", loginAdministrator);
// router.get("/administratorData", getAdministratoreData);

export default router;
