import { Router } from "express";
import { getEvaluation } from "../controllers/evaluation.controller";

export const evaluationRoutes = Router();

evaluationRoutes.get("/", getEvaluation);
