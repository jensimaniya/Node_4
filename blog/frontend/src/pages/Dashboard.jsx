import React, { useState, useEffect } from "react";
import API from "../api";
import PostForm from "./PostForm";

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const load = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saved = (post) => {
    setPosts((prev) => {
      const exists = prev.find((p) => p._id === post._id);
      if (exists) return prev.map((p) => (p._id === post._id ? post : p));
      return [post, ...prev];
    });
    setEditingPost(null);
  };

  const del = async (id) => {
    try {
      await API.delete("/posts/" + id);
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (post) => {
    setEditingPost(post);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "#1a1a2e",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          padding: "35px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: 800,
            fontSize: "32px",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #ff7eb3, #ff758c)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Dashboard – {user.name}
        </h2>

        {/* Post Form */}
        <PostForm onSaved={saved} post={editingPost} />

        {/* Post List */}
        <h3
          style={{
            marginTop: "40px",
            marginBottom: "15px",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Your Posts
        </h3>

        <ul style={{ padding: 0, listStyle: "none" }}>
          {posts.map((p) => (
            <li
              key={p._id}
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "20px",
                marginBottom: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ maxWidth: "70%" }}>
                <div style={{ fontSize: "20px", fontWeight: 700 }}>
                  {p.title}
                </div>
                <div style={{ opacity: 0.85, marginTop: "5px" }}>
                  {p.content}
                </div>
              </div>

              <div style={{ whiteSpace: "nowrap" }}>
                {/* Edit Button */}
                <button
                  style={{
                    padding: "8px 14px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ffd166",
                    color: "#000",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "0.25s",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.08)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={() => edit(p)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  style={{
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#ef476f",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "0.25s",
                    boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.08)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  onClick={() => del(p._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
