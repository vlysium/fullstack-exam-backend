import express from "express";
import dbConnect from "./dbConnect";
import authRoutes from "../routes/authRoutes";
import productRoutes from "../routes/productRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import orderRoutes from "../routes/orderRoutes";

function start(app: express.Application) {
  dbConnect();

  app.use("/api", authRoutes);
  app.use("/api", productRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", categoryRoutes);
}

export default start;