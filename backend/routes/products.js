import express from "express";

const router = express.Router();

import { getProducts, getProduct } from "../controllers/products.js";

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

export default router;
