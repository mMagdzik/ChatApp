import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("server Started at " + PORT);
});
