// controllers/brandController.js
import Brand from "../models/brandModel.js"

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const brand = new Brand({
      name,
      image: req.file ? req.file.location : null, // multer-s3 provides `location`
    });

    await brand.save();
    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
