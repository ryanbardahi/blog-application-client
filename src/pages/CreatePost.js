import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const CreatePost = () => {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="container my-5">
        <h2>Have a meditation note you want to share with the universe?</h2>
        <p>
          Please <a href="/login">sign in</a> or <a href="/register">register</a> to create a post.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://blog-application-server-r3nf.onrender.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
        const data = await response.json();
        notyf.success('Post created successfully!');
        navigate(`/posts/${data._id}`);
      } else {
        const error = await response.json();
        notyf.error(error.message || 'Failed to create post.');
      }
    } catch (error) {
      notyf.error('An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="10"
            value={form.content}
            onChange={handleChange}
            required
            placeholder="Use double line breaks to separate paragraphs."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;