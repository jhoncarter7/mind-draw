import express from "express";
import authHandler from "./routes/authRoute.js";
import createHandler from "./routes/allRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true, // allow cookies and credentials to be sent
    })
  );
app.use("/api/v1/auth", authHandler);
app.use("/api/v1", createHandler);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
