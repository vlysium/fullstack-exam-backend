import mongoose, { Schema, Document } from "mongoose";

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
    type: Object,
    url: {
      type: String,
      required: [true, "Please enter a product image"],
    },
    alt: {
      type: String,
    },
  },
  category: {
    type: Object,
    cuisine: {
      type: [String],
    },
    menu: {
      type: [String],
    }
  }
});

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: { 
    url: string;
    alt: string;
  };
  category: {
    cuisine: string[];
    menu: string[];
  };
}

export default mongoose.model<IProduct>("Product", productSchema);