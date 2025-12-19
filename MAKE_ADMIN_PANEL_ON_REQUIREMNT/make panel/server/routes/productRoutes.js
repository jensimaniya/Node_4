import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();
    res.json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", err });
  }
});

// READ
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updateData = { name, price, description };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "Updated successfully", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating", err });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
