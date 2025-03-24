import {z} from "zod"
import { User } from "./types"

export type userInput = z.infer<typeof User>