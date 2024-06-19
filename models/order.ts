import mongoose, { Schema, Document } from "mongoose";

export const orderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [{
      product: {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, "Minimum quantity is 1"],
      }
    }],
    required: true,
    _id: false,
  },
  total: {
    type: Number,
    required: true,
  },
  items_count: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


interface IOrderItem  {
  product: {
    _id: string | mongoose.Types.ObjectId;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId | string;
  user_id: string;
  items: IOrderItem[];
  total: number;
  items_count: number;
  created_at: Date;
}

export default mongoose.model<IOrder>("Order", orderSchema);