import React from 'react';
import { Link } from 'react-router-dom';
import tarotImage from '../assets/images/tarot-app.png';

const Resources = () => {
  return (
    <div className="resources-page container my-5 text-center">
      <h2 className="mb-4">Get a motivational message from the universe through our Tarot Reader Web App.</h2>
      <div className="tarot-image-container mb-4">
        <img
          src={tarotImage}
          alt="Tarot App"
          className="tarot-image"
        />
      </div>
      <Link
        to="https://bit.ly/tarot-reading-web-app"
        target="_blank"
        rel="noopener noreferrer"
        className="btn read-note-btn"
      >
        Try the tarot web app
      </Link>
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

export default Resources;