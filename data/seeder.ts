import mongoose from "mongoose";
import "dotenv/config";
import products from "./products";
import Product from "../models/product";
import categories from "./categories";
import Cuisine from "../models/cuisine";
import Menu from "../models/menu";

// connect to MongoDB
const seed = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // truncate collections
    console.log("Truncating collections");
    await Cuisine.deleteMany({});
    console.log("Truncated cuisine categories");
    await Menu.deleteMany({});
    console.log("Truncated menu categories");
    await Product.deleteMany({});
    console.log("Truncated products");

    // seed categories
    console.log("Seeding cuisine categories");
    for (const cuisine of categories.cuisines) {
      const newCuisine = await new Cuisine(cuisine).save();
      console.log(`Cuisine category created: ${newCuisine.name}`);
    }
    console.log("Seeding menu categories");
    for (const menu of categories.menus) {
      const newMenu = await new Menu(menu).save();
      console.log(`Menu category created: ${newMenu.name}`);
    }

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