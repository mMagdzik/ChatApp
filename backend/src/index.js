import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("server Started at 5000");
});
