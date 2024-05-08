import express from "express";
import dbConnect from "./dbConnect";
import authRoutes from "../routes/authRoutes";
import productRoutes from "../routes/productRoutes";

function start(app: express.Application) {
  dbConnect();

  app.use("/api", authRoutes);
  app.use("/api", productRoutes);
}

export default start;