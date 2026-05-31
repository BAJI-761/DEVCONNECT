import React, { useState } from 'react';
import api from '../../lib/api';

export default function PostForm({ onPosted }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('content', content);
      if (image) form.append('image', image);
      const res = await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setContent('');
      setImage(null);
      onPosted && onPosted(res.data.post);
    } catch (err) {
      setError(err.response?.data?.message || 'Post failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h3>Create Post</h3>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={submit}>
        <textarea className="input" value={content} onChange={(e)=>setContent(e.target.value)} placeholder="What's on your mind?" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button className="btn" disabled={loading} type="submit">{loading ? 'Posting...' : 'Post it!'}</button>
      </form>
    </div>
  );
}
