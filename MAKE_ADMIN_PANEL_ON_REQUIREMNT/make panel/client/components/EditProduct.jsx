import React, { useState } from "react";
import { updateProduct } from "../api/productAPI";

export default function EditProduct({ product, onClose, onUpdateSuccess }) {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
  });
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

    await updateProduct(product._id, data);
    alert("✅ Product updated!");
    onUpdateSuccess();
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title text-success fw-bold">Edit Product</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  name="name"
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
                    className="img-thumbnail rounded-3 shadow-sm"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary rounded-3 "
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success rounded-3">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
