// models/Brand.js
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String }, // store the image URL or path
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
