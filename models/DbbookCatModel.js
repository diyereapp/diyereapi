
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DbCategory",
      default: null, // null means it's a top-level category
    },
    image: {
      type: String, // Store the image URL or filename
    },
    icon: {
      type: String, // Emoji or icon name
    },
  },
  { timestamps: true }
);

export default mongoose.model("DbCategory", categorySchema);
