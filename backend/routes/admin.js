import express from "express";

const router = express.Router();

import { isAuth } from "../middleware/is-auth.js";

router.get("/users");

export default router;
