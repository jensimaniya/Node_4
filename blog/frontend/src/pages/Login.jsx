import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("sessionId", res.data.sessionId);
      setUser(res.data.user);
      nav("/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f2027",
        backgroundImage: "linear-gradient(135deg, #2c5364, #203a43, #0f2027)",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          borderRadius: "18px",
          padding: "35px",
          color: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: "800",
            fontSize: "28px",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome Back!
        </h2>

        {err && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "rgba(255, 0, 0, 0.4)",
              color: "#fff",
              textAlign: "center",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {err}
          </div>
        )}

        <form onSubmit={submit}>
          {/* Email */}
          <label
            style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "18px",
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
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "24px",
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
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #24c6dc, #514a9d)",
              fontSize: "17px",
              fontWeight: "700",
              color: "white",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 5px 18px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
