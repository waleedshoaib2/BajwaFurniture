// routes/userInteractionRoutes.js

import express from "express";
import {
  updateUserInteractions,
  updateUserSearch,
} from "../controllers/userInteractionController.js";
import { checkAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST route to update user interactions
router.post("/user/interactions", checkAuth, updateUserInteractions);

export default router;
