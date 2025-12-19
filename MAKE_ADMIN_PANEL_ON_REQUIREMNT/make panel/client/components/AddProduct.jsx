import React, { useState } from "react";
import { addProduct } from "../api/productAPI";

export default function AddProduct({ onAddSuccess }) {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    if (image) data.append("image", image);

    try {
      await addProduct(data);
      alert("✅ Product added successfully!");
      setForm({ name: "", price: "", description: "" });
      setImage(null);
      setPreview("");
      onAddSuccess();
    } catch (error) {
      alert("❌ Error adding product");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-4 fw-bold text-success">Add New Product</h4>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="form-control rounded-3 shadow-sm"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Price (₹)</label>
            <input
              name="price"
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              className="form-control rounded-3 shadow-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Write product details..."
              value={form.description}
              onChange={handleChange}
              className="form-control rounded-3 shadow-sm"
              rows="3"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="form-control rounded-3 shadow-sm"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail shadow-sm rounded-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success rounded-3 fw-semibold shadow-sm">
              ➕ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
