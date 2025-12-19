import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import Login from "../components/Login";
import Register from "../components/Register";


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("admin_token"));
  const navigate = useNavigate();

  // watch for login changes (auto-redirect if token found)
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <>
              <button
                className="btn btn-danger position-absolute top-0 end-0 m-3"
                onClick={handleLogout}
              >
                Logout
              </button>
              <div className="container my-5">
                <AddProduct />
                <hr />
                <ProductList />
              </div>
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
