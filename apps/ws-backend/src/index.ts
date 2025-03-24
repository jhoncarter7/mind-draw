import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
const wss = new WebSocketServer({ port: 8080 });

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
  const user = VerifyUser(token);
  if (user == null) {
    return;
  }
  ws.on("message", (data) => {
    console.log(data);
  });
  
});

