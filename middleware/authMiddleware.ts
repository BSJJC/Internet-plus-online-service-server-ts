import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import administratorModel from "../models/administratorModel";


/**
 * @description       Verify token
*/
const protect = asyncHandler(async (req: Request, res: Response, next) => {
  let token: string = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded: jwt.JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );

      const administrator = await administratorModel
        .findById((decoded as jwt.JwtPayload).id)
        .select("-password");

      req.body.administrator = administrator;

      next();
    } catch (err) {
      console.log(err);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
