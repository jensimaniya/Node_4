import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", { name, email, password });
      setMsg("Registered successfully! Redirecting to login...");
      setTimeout(() => nav("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #8157adff, #436eb9ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          borderRadius: "20px",
          padding: "30px",
          color: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "22px",
            fontWeight: "700",
            fontSize: "24px",
            letterSpacing: "0.5px",
            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create an Account
        </h2>

        {msg && (
          <div
            style={{
              padding: "10px",
              marginBottom: "18px",
              borderRadius: "10px",
              background: msg.includes("successfully")
                ? "rgba(0, 255, 135, 0.3)"
                : "rgba(255, 0, 0, 0.3)",
              color: "#fff",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={submit}>
          {/* Name */}
          <label
            style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
            }}
          />

          {/* Email */}
          <label
            style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
            }}
          />

          {/* Password */}
          <label
            style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
            }}
          />

          {/* Confirm Password */}
          <label
            style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "15px",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)",
            }}
          />

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #ff6a00, #ee0979)",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 5px 18px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
