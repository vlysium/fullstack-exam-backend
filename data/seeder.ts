import mongoose from "mongoose";
import "dotenv/config";
import products from "./products";
import Product from "../models/product";

// connect to MongoDB
const seed = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // truncate collections
    console.log("Truncating collections");
    await Product.deleteMany({});
    console.log("Truncated collections");

    // seed products
    console.log("Seeding products")
    for (const product of products) {
      const newProduct = await new Product(product).save();
      console.log(`Product created: ${newProduct.name}`);
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