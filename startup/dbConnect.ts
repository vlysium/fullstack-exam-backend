import mongoose from "mongoose";

async function dbConnect() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.error(error);
  }
}

export default dbConnect;