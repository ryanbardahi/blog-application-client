import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserContext();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://blog-application-server-r3nf.onrender.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post:', error));

    fetch(`https://blog-application-server-r3nf.onrender.com/comments/post/${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, [id]);

  if (!post) {
    return <div className="container">Loading...</div>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  const paragraphs = post.content.split(/\n{2,}/);

  const authorId = typeof post.author === 'object' ? post.author._id : post.author;

  const canEdit =
    isLoggedIn &&
    user &&
    (user.id === authorId || user.isAdmin);

  const canDeletePost = isLoggedIn && user && user.isAdmin;

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    setIsDeleting(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `https://blog-application-server-r3nf.onrender.com/posts/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        notyf.success('Post deleted successfully!');
        navigate('/notes');
      } else {
        const error = await response.json();
        notyf.error(error.error || 'Failed to delete post.');
      }
    } catch (error) {
      notyf.error('An error occurred while deleting the post.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      notyf.error('Comment cannot be empty.');
      return;
    }

    setIsSubmittingComment(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `https://blog-application-server-r3nf.onrender.com/comments/post/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (response.status === 201) {
        const comment = await response.json();
        setComments((prevComments) => [...prevComments, comment]);
        setNewComment('');
        notyf.success('Comment added successfully!');
      } else {
        const error = await response.json();
        notyf.error(error.error || 'Failed to add comment.');
      }
    } catch (error) {
      notyf.error('An error occurred while adding the comment.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        `https://blog-application-server-r3nf.onrender.com/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        notyf.success('Comment deleted successfully!');
      } else {
        const error = await response.json();
        notyf.error(error.error || 'Failed to delete comment.');
      }
    } catch (error) {
      notyf.error('An error occurred while deleting the comment.');
    }
  };

  return (
    <div className="post-page container my-5 pb-5">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By {post.author.username} on {formattedDate}
      </p>

      <div className="d-flex gap-3">
        {canEdit && (
          <button className="btn btn-secondary" onClick={() => setShowModal(true)}>
            Edit Post
          </button>
        )}
        {canDeletePost && (
          <button
            className="btn btn-danger"
            onClick={handleDeleteClick}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        )}
      </div>

      <div className="post-content mt-3">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <div className="comments-section mt-5">
        <h3>Comments</h3>
        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </div>
                {user?.isAdmin && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Be the first to comment.</p>
        )}

        {isLoggedIn ? (
          <form onSubmit={handleAddComment} className="mt-3">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn read-note-btn"
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? 'Submitting...' : 'Add Comment'}
            </button>
          </form>
        ) : (
          <p className="text-muted mt-3">
            Please <a href="/login" className="text-decoration-none">log in</a> to comment.
          </p>
        )}
      </div>
      <footer className="footer mt-5 mb-5 text-center">
        <p>
          Page background photo by{' '}
          <a
            href="https://unsplash.com/@thommilkovic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Thom Milkovic
          </a>{' '}
          on{' '}
          <a
            href="https://unsplash.com/photos/black-sailboat-on-body-of-water-under-gray-sky-e2RisjiIVSw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Post;