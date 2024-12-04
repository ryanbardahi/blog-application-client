import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://blog-application-server-r3nf.onrender.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const truncateContent = (content) => {
    const plainText = content.replace(/\\n/g, ' ').replace(/\\/g, '');
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  return (
    <div className="notes-page container my-5">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post._id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">By {post.author.username}</h6>
                <p className="card-text flex-grow-1">
                  {truncateContent(post.content)}
                </p>
                <Link to={`/posts/${post._id}`} className="btn btn-primary mt-auto">
                  Read this meditation note
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;