import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("admin_token", res.data.token);
      alert("✅ Login successful!");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3 text-success fw-bold">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Login to your admin dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            New here?{" "}
            <Link to="/register" className="text-decoration-none text-success fw-semibold">
              Create an account
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
