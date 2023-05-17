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

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "An unknown error occurred";
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
