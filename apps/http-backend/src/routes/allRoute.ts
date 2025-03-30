import express, {Router} from "express"
import { ChatController, createRoom, getLastChat } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const route: Router = express.Router()

route.post("/create-room",authMiddleware, createRoom)
route.post("/chat/:roomId", authMiddleware, ChatController)
route.get("/lastChat/:roomId", authMiddleware, getLastChat)
route.get("/chat/:slug", authMiddleware, getLastChat)

export default route