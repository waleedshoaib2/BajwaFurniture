import express from "express";
import { checkAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();
import { getRecommendations } from "../controllers/recommendationController.js";

router.get("/", checkAuth, getRecommendations);

export default router;
