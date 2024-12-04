import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    fetch('https://blog-application-server-r3nf.onrender.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        const shuffledPosts = data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRandomPosts(shuffledPosts);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="home-page">
      <div className="intro-section my-5 mx-auto px-5 py-3">
        <p><span className="bold">Take a moment to breathe.</span></p>
        <p>This is a space to <span className="italic">slow down</span>, <span className="italic">reflect</span>, and <span className="italic">find meaning in the everyday</span>.</p>
        <p>Through simple thoughts and reflections, we explore how to live with purpose, face life’s challenges, and reconnect with yourself in a way that feels authentic and grounding.</p>
      </div>
      <Carousel>
        {randomPosts.map((post) => (
          <Carousel.Item key={post._id}>
            <div className="carousel-item-content mx-auto mb-5 text-center p-4">
              <h2 className="carousel-title">{post.title}</h2>
              <p className="carousel-meta">
                By {post.author.username} on{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="carousel-body">
                {post.content.substring(0, 300)}...
              </p>
              <a
                href={`/posts/${post._id}`}
                className="btn mt-3 read-note-btn"
              >
                Read this meditation note
              </a>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
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

export default Home;