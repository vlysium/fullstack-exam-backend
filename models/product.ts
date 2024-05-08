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
    default: function (this: { name: string }) {
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
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    required: [true, "Please enter a product image"],
  },
  categories: {
    type: [{ ref: "Category", type: Schema.Types.ObjectId }], // referencing the id to use populate()
    required: [true, "Please enter product categories"],
  }
});

export interface IProduct extends Document {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: { 
    url: string;
    alt: string;
  };
  categories: ICategory["_id"][];
}

export default mongoose.model<IProduct>("Product", productSchema);