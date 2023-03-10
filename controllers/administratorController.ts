import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

import administratorModel from "../models/administratorModel";

/**
 * @description          Register new administrator
 * @route                     POST /api/administrator
 * @access                 Public
 */
const registerAdministrator = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Check if administrator exists
    const administratorExists = await administratorModel.findOne({ email });
    if (administratorExists) {
      res.status(400);
      throw new Error("Administrator already exists");
    }

    //  Hash password
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    //  Create administrator
    const administrator = await administratorModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (administrator) {
      res.status(200).json({
        _id: administrator.id,
        name: administrator.name,
        email: administrator.email,
        token: generateToken(administrator.id, 1, "d"),
      });
    } else {
      res.status(400);
      throw new Error("Invalid administrator data");
    }
  }
);

/**
 * @description        Authenticate ad administrator
 * @router                 POST /api/administrator/login
 * @access               Public
 */
const loginAdministrator = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for administrator email
  const administrator = await administratorModel.findOne({ email });
  if (
    administrator &&
    (await bcrypt.compare(password, administrator.password))
  ) {
    res.status(200).json({
      _id: administrator.id,
      name: administrator.name,
      email: administrator.email,
      token: generateToken(administrator.id, 1, "d"),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getAdministratoreData = asyncHandler(
  async (req: Request, res: Response) => {
    //@ts-ignore
    const { _id, name, email } = await administratorModel.findById(
      req.body.administrator.id
    );

    res.status(200).json({
      id: _id,
      name,
      email,
    });
  }
);

export { registerAdministrator, loginAdministrator, getAdministratoreData };
