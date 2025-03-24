import { prismaClient } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("req.headers", req.headers);
  // console.log("req.cookies", req.cookies);
  const token = req.cookies.accesToken || req.headers["authorization"]?.split(" ")[1];

  try {
    if (!token || process.env.Auth_JWT_KEY == undefined) {
      return;
    }

    const decode = jwt.verify(
      token,
      process.env.Auth_JWT_KEY
    ) as jwt.JwtPayload;
    if (!decode) {
      return next(new Error("No token provided"));
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decode.userId },
      select: { id: true, username: true, password: false },
    });
    if (!user) {
      return next(new Error("user not found"));
    }
    req.user = user;
    next()
  } catch (error) {
    next(new Error(`Error while verifying user: ${error}`));
  }
};
