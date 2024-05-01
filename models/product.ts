import mongoose, { Schema, Document } from "mongoose";
import { ICategory, categorySchema } from "./category";

export const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return this.name.toLowerCase().split(" ").join("-");
    }
  },
  description: {
    type: String,
    required: [true, "Please enter a product description"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price"],
  },
  image: {
    type: String,
    required: [true, "Please enter a product image"],
  },
  categories: [categorySchema]
});

export interface IProduct extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  categories: ICategory[];
}

export default mongoose.model<IProduct>("Product", productSchema);