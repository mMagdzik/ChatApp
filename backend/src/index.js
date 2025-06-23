import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("server Started at 5000");
});

// router.get("/", getProducts);
// router.post("/", createProduct);
// router.put("/:id", updateProduct); //PATH , ALTERNATYWA (SOME METHODS)
// router.delete("/:id", deleteProduct);
