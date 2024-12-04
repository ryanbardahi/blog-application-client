import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const Post = () => {
  const { id } = useParams();
  const { user, isLoggedIn } = useUserContext();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`https://blog-application-server-r3nf.onrender.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched post data:', data);
        setPost(data);
        setEditForm({ title: data.title, content: data.content });
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return <div className="container">Loading...</div>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  const paragraphs = post.content.split(/\n{2,}/);

  // Check if the logged-in user is the author or an admin
  const canEdit =
    isLoggedIn &&
    user &&
    (user.id === post.author._id || user.isAdmin);

  console.log('User:', user);
  console.log('Is Logged In:', isLoggedIn);
  console.log('Can Edit:', canEdit);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `https://blog-application-server-r3nf.onrender.com/posts/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setPost(data);
        setShowModal(false);
        notyf.success('Post updated successfully!');
      } else {
        const error = await response.json();
        notyf.error(error.error || 'Failed to update post.');
      }
    } catch (error) {
      notyf.error('An error occurred while updating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-page container my-5">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By {post.author.username} on {formattedDate}
      </p>

      {canEdit && (
        <button className="btn btn-secondary mb-3" onClick={handleEditClick}>
          Edit Post
        </button>
      )}

      <div className="post-content">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      {/* Edit Post Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Post</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-3">
                <label htmlFor="editTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="editTitle"
                  name="title"
                  className="form-control"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editContent" className="form-label">
                  Content
                </label>
                <textarea
                  id="editContent"
                  name="content"
                  className="form-control"
                  rows="10"
                  value={editForm.content}
                  onChange={handleEditFormChange}
                  required
                  placeholder="Use double line breaks to separate paragraphs."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Post'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;