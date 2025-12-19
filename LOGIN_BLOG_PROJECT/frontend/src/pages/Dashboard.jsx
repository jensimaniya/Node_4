import React, { useState, useEffect } from 'react';
import API from '../api';
import PostForm from './PostForm';

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const load = async () => {
    try {
      const res = await API.get('/posts');
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
      await API.delete('/posts/' + id);
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (post) => {
    setEditingPost(post);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard - {user.name}</h2>
      <PostForm onSaved={saved} post={editingPost} />

      <ul className="list-group">
        {posts.map((p) => (
          <li
            key={p._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{p.title}</div>
              {p.content}
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => edit(p)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => del(p._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
