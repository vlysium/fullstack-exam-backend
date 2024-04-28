import express from "express";
import mongoose from "mongoose";
import cors from "cors";

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send({"message": "Hello world!"});
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});