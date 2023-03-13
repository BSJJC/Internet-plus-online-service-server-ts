import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import administratorAvaterModel from "../models/administratorAvaterModel";

const uploadAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.file) {
      res.send("Single file uploaded successfully");
    } else {
      res.status(400).send("Please upload a valid image");
    }
  }
);

const getAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {}
);

export { uploadAdministratorAvater, getAdministratorAvater };
