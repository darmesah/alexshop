import express from "express";

const router = express.Router();

import { isAdmin, isAuth } from "../middleware/is-auth.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/admin.js";

router.get("/users", isAuth, isAdmin, getUsers);

router.get("/users/:id", isAuth, isAdmin, getUser);

router.patch("/users/:id", isAuth, isAdmin, updateUser);

router.delete("/users/:id", isAuth, isAdmin, deleteUser);

export default router;
