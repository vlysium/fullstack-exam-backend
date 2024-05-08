import mongoose, { Schema, Document } from "mongoose";
import { IProduct, productSchema } from "./product";

export const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [{
    product: productSchema,
    quantity: {
      type: Number,
      required: true,
      min: [1, "Minimum quantity is 1"],
    }
  }],
  total: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// interface to include the product quantity for each item in the order
interface IProductQuantity extends IProduct {
  quantity: number;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId | string;
  user_id: string;
  items: IProductQuantity[];
  total: number;
  created_at: Date;
}

export default mongoose.model<IOrder>("Order", orderSchema);