import express from "express";
import dbConnect from "./dbConnect";

function start(app: express.Application) {
  dbConnect();
}

export default start;