import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";

export const authRoutes = Router();

authRoutes.post("/register", validate({ body: registerSchema }), authController.register);
authRoutes.post("/login", validate({ body: loginSchema }), authController.login);
