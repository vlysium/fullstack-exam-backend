import mongoose, { Schema, Document } from "mongoose";

export const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a category name"],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    default: function (this: { name: string }) {
      return this.name.toLowerCase().split(" ").join("-");
    }
  },
  type: {
    type: String,
    enum: ["cuisine", "course"],
    required: [true, "Please enter a category type"],
  },
});

export interface ICategory extends Document {
  _id: string;
  name: string;
  slug: string;
  type: "cuisine" | "course";
}

// specify the collection name as "categories" instead due to the plural form of the model name
export default mongoose.model<ICategory>("Category", categorySchema, "categories");