import React, { useState, useEffect } from 'react';
import API from '../api';

export default function PostForm({ onSaved, post }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (post?._id) {
        res = await API.put('/posts/' + post._id, { title, content });
      } else {
        res = await API.post('/posts', { title, content });
      }
      onSaved(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {post?._id ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
}
