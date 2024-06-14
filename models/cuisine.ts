import mongoose, { Schema } from "mongoose";

export const cuisineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a cuisine name"],
    trim: true,
  },
  value: {
    type: String,
    default: function (this: { name: string }) {
      return this.name
        .toLowerCase()
        .replace(/[^a-z\s-]/g, "") // remove special characters except hyphens
        .replace(/\s+/g, ' ')      // replace multiple spaces with a single space
        .trim()
        .split(" ")
        .join("-");
    }
  }
});

export interface ICuisine extends Document {
  _id: string;
  name: string;
  value: string;
}

export default mongoose.model<ICuisine>("Cuisine", cuisineSchema);