import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { prismaClient } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });

// features to add
// 1. Now anyone can send message to any room , add auth to verify to first join the room than send
// 2 we are not persistance to db so when we send msg store in queue and than send to db or somthing like that
// certain people can join certain room like criteria wise

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}
const users: User[] = [];

const VerifyUser = (token: string): string | null => {
  if (!token || process.env.Auth_JWT_KEY == undefined) {
    return null;
  }
  const decode = jwt.verify(token, process.env.Auth_JWT_KEY);
  if (typeof decode == "string") {
    return null;
  }
  if (!decode || !decode.userId) {
    return null;
  }

  return decode?.userId;
};

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token") || "";
  const userId = VerifyUser(token);
  if (!userId) {
    ws.close();
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws,
  });
  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "Leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }
    if (parsedData.type === "chat") {
      console.log("ws roomid", parsedData)
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      const resp = await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId,
        },
      });
      console.log("chatres", resp);
      users?.forEach((user) => {
        if (user?.rooms?.includes(roomId)) {
          user?.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
