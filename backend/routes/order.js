import express from "express";

const router = express.Router();

import { isAdmin, isAuth } from "../middleware/is-auth.js";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderDelivered,
  updateOrderToPaid,
} from "../controllers/order.js";

router.get("/myorders", isAuth, getUserOrders);

router.post("/orders", isAuth, createOrder);

router.get("/orders/:id", isAuth, getOrderById);

router.patch("/orders/:id/pay", isAuth, updateOrderToPaid);

// ADMIN - Get all orders
router.get("/admin/orders", isAuth, isAdmin, getAllOrders);

router.patch("/admin/deliver/:id", isAuth, isAdmin, updateOrderDelivered);

export default router;
