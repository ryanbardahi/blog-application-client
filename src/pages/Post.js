import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://blog-application-server-r3nf.onrender.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return <div className="container">Loading...</div>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="post-page container my-5">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">
        By {post.author.username} on {formattedDate}
      </p>
      <div className="post-content">{post.content}</div>
    </div>
  );
};

export default Post;