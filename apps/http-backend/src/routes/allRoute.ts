import express, {Router} from "express"
import { ChatController, createRoom, getLastChat, getRoomId } from "../controllers/authController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const route: Router = express.Router()

route.post("/create-room",authMiddleware, createRoom)
route.post("/chat/:roomId", authMiddleware, ChatController)
route.get("/lastChat/:roomId",   getLastChat)
route.get("/chat/:slug", getRoomId)

export default route