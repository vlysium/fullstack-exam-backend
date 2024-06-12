import mongoose, { Schema } from "mongoose";

export const menuSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a menu name"],
    trim: true,
  },
  slug: {
    type: String,
    default: function (this: { name: string }) {
      return this.name.toLowerCase().split(" ").join("-");
    }
  }
});

export interface IMenu extends Document {
  _id: string;
  name: string;
  slug: string;
}

export default mongoose.model<IMenu>("Menu", menuSchema);