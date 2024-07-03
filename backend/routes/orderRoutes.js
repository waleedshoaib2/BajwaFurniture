import express from "express";
import {
  getOrderItems,
  getAllMyOrders,
  getAllOrders,
  updateOrderToDelivered,
  deleteOrderById,
} from "../controllers/orderController.js";

import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// user route
router.get("/myorders", checkAuth, getAllMyOrders);
router.get("/:id", checkAuth, getOrderItems);

// admin route
router.get("/", checkAuth, isAdmin, getAllOrders);
router.delete("/:id", checkAuth, isAdmin, deleteOrderById);
router.put(
  "/:id/deliver",
  checkAuth,
  isAdmin,

  updateOrderToDelivered
);

export default router;
