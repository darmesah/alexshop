import express from "express";

const router = express.Router();

import { isAuth } from "../middleware/is-auth.js";

import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
} from "../controllers/order.js";

router.get("/myorders", isAuth, getUserOrders);

router.post("/orders", isAuth, createOrder);

router.get("/orders/:id", isAuth, getOrderById);

router.patch("/orders/:id/pay", isAuth, updateOrderToPaid);

export default router;
