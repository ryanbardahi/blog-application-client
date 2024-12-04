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
                <h6 className="card-subtitle mb-2 text-muted">
                  By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
                </h6>
                <p className="card-text flex-grow-1">
                  {truncateContent(post.content)}
                </p>
                <Link
                  to={`/posts/${post._id}`}
                  className="btn read-note-btn mt-auto"
                >
                  Read this meditation note
                </Link>
              </div>
            </div>
          </div>
        ))}
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

export default Notes;