import { json, NextFunction, Request, response, Response } from "express";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { CreateUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/types";
import bcrypt from "bcryptjs";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body", req.body);
  const parsedBody = CreateUserSchema.safeParse(req.body);

  try {
    if (!parsedBody.success) {
      return next(new Error("fill all input"));
    }
    const hashedPass = bcrypt.hashSync(
      parsedBody?.data?.password as string,
      10
    );
    const response = await prismaClient.user.create({
      data: {
        username: parsedBody.data?.username as string,
        email: parsedBody.data?.email as string,
        password: hashedPass,
      },
    });

    res.status(201).json(response);
    next();
  } catch (error) {
    console.error(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = SigninSchema.safeParse(req.body);
  // console.log("parsedBody", parsedBody)
  try {
    // console.log("signin1223", process.env.Auth_JWT_KEY)
    if (process.env.Auth_JWT_KEY == undefined || !parsedBody.success) {
      res.status(401).send({
        message: "unauthorized",
      });
      return;
    }
    const response = await prismaClient.user.findFirst({
      where: { email: parsedBody?.data?.email },
    });
    if (!response || response == null) {
      res.status(404).send({
        message: "email is not correct",
      });
      return;
    }
    const isPasswordCorrect = bcrypt.compare(
      parsedBody?.data?.password as string,
      response.password
    );
    if (!isPasswordCorrect) {
      res.send({
        message: "Incorrect password",
      });
      return;
    }

    const accesToken = jwt.sign(
      {
        userId: response.id,
        username: response.username,
      },
      process.env.Auth_JWT_KEY,
      { expiresIn: "1d" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.status(200).cookie("accesToken", accesToken, options).json({
      username: response.username,
      email: response.email,
      message: "signin successfull",
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const parsedBody = CreateRoomSchema.safeParse(req.body);

  try {
    console.log("req.user", req.user);
    if (!req.user?.id || !parsedBody.success) {
      res.status(401).send({
        message: "unauthorized",
      });
      return;
    }
    const response = await prismaClient.room.create({
      data: {
        slug: parsedBody?.data?.slug as string,
        adminId: req.user?.id,
      },
    });
    if (!response) {
      res.status(400).send({
        message: "server side issue",
      });
    }
    res.status(201).json({ response, message: "room created successfully" });
    next();
  } catch (error) {
    console.error(error);
  }
};

// 
const ChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  const roomId = Number(req.params.roomId);
  try {
    if (!message || !roomId) {
      res.status(400).send({
        message: "fill all input",
      });
      return;
    }
    const chatResponse = await prismaClient.chat.create({
      data: {
        message,
        roomId,
        userId: req.user?.id,
      },
    });

    
    if (!chatResponse) {
      res.status(400).send({
        message: "server side issue",
      });
      return;
    }
    res
      .status(201)
      .json({ chatResponse, message: "chat createed successfully" });
    next();
  } catch (error) {
    console.error(error);
  }
};

const getLastChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = Number(req.params.roomId);
    if (!roomId) {
      res.status(400).send({
        message: "fill all input",
      });
      return;
    }
    const lastFiftyChattRes = await prismaClient.chat.findMany({
      where: {
         roomId,
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!lastFiftyChattRes) {
      res.status(400).send({
        message: "server side issue",
      });
      return;
    }
    res.status(200).json(lastFiftyChattRes);
    next();
  } catch (error) {
    console.error(error);
  }
};


const getRoomId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {slug} = req.params;
    if (!slug) {
      res.status(400).send({
        message: "fill all input",
      });
      return;
    }
    const room = await prismaClient.room.findFirst({
      where: {
         slug,
      },
      
    });
    if (!room) {
      res.status(400).send({
        message: "server side issue",
      });
      return;
    }
    res.status(200).json(room);
    next();
  } catch (error) {
    console.error(error);
  }
};



export { signin, signup, createRoom, ChatController, getLastChat, getRoomId };
