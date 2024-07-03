import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blogController.js";
import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", checkAuth, isAdmin, createPost);
router.put("/posts/:id", checkAuth, isAdmin, updatePost);
router.delete("/posts/:id", checkAuth, isAdmin, deletePost);

export default router;
