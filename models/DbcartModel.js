// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: { type: String, required: true }, // unique per user/visitor
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "DbProduct" },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

export default mongoose.model("DbCart", cartSchema);
