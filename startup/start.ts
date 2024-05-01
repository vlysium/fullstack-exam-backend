import express from "express";
import dbConnect from "./dbConnect";
import authRoutes from "../routes/authRoutes";

function start(app: express.Application) {
  dbConnect();

  app.use("/api", authRoutes);
}

export default start;