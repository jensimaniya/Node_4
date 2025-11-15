import React, { useState, useEffect } from "react";
import API from "../api";

export default function PostForm({ onSaved, post }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (post?._id) {
        res = await API.put("/posts/" + post._id, { title, content });
      } else {
        res = await API.post("/posts", { title, content });
      }
      onSaved(res.data);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "28px",
        borderRadius: "20px",
        backdropFilter: "blur(16px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        marginBottom: "25px",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3
        style={{
          marginBottom: "22px",
          textAlign: "center",
          fontWeight: "700",
          fontSize: "22px",
          letterSpacing: "0.5px",
          background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {post?._id ? "Edit Post" : "Create New Post"}
      </h3>

      {/* Title */}
      <label
        style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
      >
        Title
      </label>
      <input
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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

      {/* Content */}
      <label
        style={{ fontWeight: "600", marginBottom: "6px", display: "block" }}
      >
        Content
      </label>
      <textarea
        placeholder="Enter post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
        required
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "22px",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          resize: "none",
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
          background: post?._id
            ? "linear-gradient(135deg, #ff512f, #dd2476)"
            : "linear-gradient(135deg, #00c6ff, #0072ff)",
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
        {post?._id ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
}
