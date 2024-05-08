import express from "express";
import cors from "cors";
import "dotenv/config";
import start from "./startup/start";

const app = express();
app.use(cors());
app.use(express.json());

// serve static files
app.use(express.static("public"));
app.use("/images", express.static(__dirname + "/images"));

start(app);

app.get("/", (req, res) => {
  res.send({"message": "Hello world!"});
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});