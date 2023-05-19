import path from "path";
import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new Error("Could not find this route");
  error.statusCode = 404;
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(PORT);
    console.log("Server running on port " + PORT);
  })
  .catch((err) => console.log(err));
