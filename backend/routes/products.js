import express from "express";

const router = express.Router();

import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/products.js";

import fileUpload from "../middleware/file-upload.js";
import { isAdmin, isAuth } from "../middleware/is-auth.js";

router.get("/products", getProducts);

router.get("/products/top", getTopProducts);

router.get("/products/:id", getProduct);

router.post("/products/:id/reviews", isAuth, createProductReview);

// ADMIN

router.post("/products", isAuth, isAdmin, createProduct);

router.patch(
  "/products/:id",
  isAuth,
  isAdmin,
  fileUpload.single("image"),
  updateProduct
);

router.delete("/products/:id", isAuth, isAdmin, deleteProduct);

export default router;
