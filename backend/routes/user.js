import express from "express";

const router = express.Router();

import { isAuth } from "../middleware/is-auth.js";

import {
  getProfile,
  login,
  signup,
  updateProfile,
} from "../controllers/user.js";

router.post("/login", login);

router.post("/signup", signup);

router.get("/profile", isAuth, getProfile);

router.patch("/profile", isAuth, updateProfile);

export default router;
