import mongoose from "mongoose";
import "dotenv/config";
import categories from "./categories";
import Category from "../models/category";

// connect to MongoDB
const seed = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // truncate collections
    await Category.deleteMany({});
    console.log("Truncated collections");

    // seed categories
    for (const category of categories) {
      const newCategory = await new Category(category).save();
      console.log(`🌱 Category created: ${newCategory.name}`);
    }
    
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

seed();