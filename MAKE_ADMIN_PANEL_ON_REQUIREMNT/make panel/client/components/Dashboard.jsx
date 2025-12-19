import React from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Existing Add and List Components */}
      <AddProduct />
      <ProductList />
    </div>
  );
}
