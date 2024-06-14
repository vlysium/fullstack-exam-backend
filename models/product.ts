import mongoose, { Schema, Document } from "mongoose";
import { ICuisine, cuisineSchema } from "./cuisine";
import { IMenu, menuSchema } from "./menu";

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
      return this.name
        .toLowerCase()
        .replace(/[^a-z\s]/g, '') // Remove non-letter characters
        .split(" ")
        .join("-");
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
  rating: {
    type: Number,
    default: 3,
    min: [0, "Minimum rating is 0"],
    max: [5, "Maximum rating is 5"],
  },
  image: {
    src: {
      type: String,
      unique: true,
      default: function (this: { name: string }) {
        const slug = this.name
          .toLowerCase()
          .replace(/[^a-z\s-]/g, "") // remove special characters except hyphens
          .replace(/\s+/g, ' ')      // replace multiple spaces with a single space
          .trim()
          .split(" ")
          .join("-")
        return `/images/${slug}.webp`
      }
    },
    alt: {
      type: String,
    },
  },
  categories: {
    cuisines: {
      _id: false,
      type: [cuisineSchema]
    },
    menus: {
      _id: false,
      type: [menuSchema]
    }
  }
});

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  slug: string;
  description: string;
  price: number;
  rating: number;
  image: { 
    src: string;
    alt: string;
  };
  categories: {
    cuisines: [ICuisine];
    menus: [IMenu];
  };
}

export default mongoose.model<IProduct>("Product", productSchema);