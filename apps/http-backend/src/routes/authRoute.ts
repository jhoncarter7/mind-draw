
import express, { Router } from 'express';
import { signin, signup } from "../controllers/authController.js";


const route: Router = express.Router();


route.post('/signup', signup)
route.post('/signin', signin as any)


export default route