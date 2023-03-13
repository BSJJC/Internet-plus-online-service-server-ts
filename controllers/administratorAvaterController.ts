import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import administratorAvaterModel from "../models/administratorAvaterModel";

const uploadAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.file) {
      //@ts-ignore
      const id = req.file.id;
      const test = await administratorAvaterModel.create({
        fileId: id,
      });

      res.json(test);
    } else {
      res.status(400).send("Please upload a valid image");
    }
  }
);

const getAdministratorAvater = asyncHandler(
  async (req: Request, res: Response) => {
    const avaterId = req.body.id;

    const test = await administratorAvaterModel.find({ fileId: avaterId });

    res.json({ test });
  }
);

export { uploadAdministratorAvater, getAdministratorAvater };
