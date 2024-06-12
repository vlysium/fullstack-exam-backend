import mongoose, { Schema } from "mongoose";

export const cuisineSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a cuisine name"],
    trim: true,
  },
  slug: {
    type: String,
    default: function (this: { name: string }) {
      return this.name.toLowerCase().split(" ").join("-");
    }
  }
});

export interface ICuisine extends Document {
  _id: string;
  name: string;
  slug: string;
}

export default mongoose.model<ICuisine>("Cuisine", cuisineSchema);