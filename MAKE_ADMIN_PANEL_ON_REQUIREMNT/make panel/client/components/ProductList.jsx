import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productAPI";
import EditProduct from "./EditProduct";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center">Product List</h2>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                className="card-img-top rounded-top-4"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-semibold">{product.name}</h5>
                <p className="card-text text-success fw-bold">₹{product.price}</p>
                <p className="card-text text-muted small">{product.description}</p>

                <div className="mt-auto d-flex justify-content-between">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="btn btn-primary btn-sm rounded-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-danger btn-sm rounded-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdateSuccess={fetchProducts}
        />
      )}
    </div>
  );
}
