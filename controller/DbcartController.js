
import DbCart from "../models/DbcartModel.js";


// Get cart by cartId
export const getCart = async (req, res) => {
  try {
    const { cartId } = req.query;
    if (!cartId) return res.json({ items: [] });

    const cart = await DbCart.findOne({ cartId }).populate("items.product");
    res.json(cart || { cartId, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add/update cart
export const saveCart = async (req, res) => {
  try {
    const { cartId, items } = req.body;

    let cart = await DbCart.findOneAndUpdate(
      { cartId },
      { items },
      { new: true, upsert: true }
    ).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
