import React, { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const TalkToUniverse = () => {
  const { isLoggedIn } = useUserContext();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      notyf.error('Your message cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(
        'https://blog-application-server-r3nf.onrender.com/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: message }),
        }
      );

      if (response.status === 201) {
        setMessage('');
        setMessageSent(true);
        notyf.success('Message sent to universe!');
      } else {
        const error = await response.json();
        notyf.error(error.error || 'Failed to send message.');
      }
    } catch (error) {
      notyf.error('An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setMessageSent(false);
    setMessage('');
  };

  return (
    <div className="talk-to-universe-page container my-5 text-center">
      {isLoggedIn ? (
        <>
          {messageSent ? (
            <>
              <h2 className="mb-4 magical-heading">
                The universe received your message.
              </h2>
              <p className="mb-4">
                Wait. Listen. Be patient. What goes around comes
                around.
              </p>
              <button className="btn read-note-btn" onClick={resetForm}>
                Send a new message 🌌
              </button>
            </>
          ) : (
            <>
              <h2 className="mb-4 magical-heading">
                We are connected to the universe. Sending a message is a way to
                reflect, let go, and find clarity. It’s a meditative process that
                helps you center yourself and feel heard.
              </h2>
              <form onSubmit={handleSubmit} className="universe-form mx-auto">
                <div className="mb-4">
                  <textarea
                    className="form-control magical-textarea"
                    rows="5"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn read-note-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send to the Universe'}
                </button>
              </form>
            </>
          )}
        </>
      ) : (
        <>
          <h4 className="mb-5 magical-heading">
            We are connected to the universe. Sending a message is a way to
            reflect, let go, and find clarity. It’s a meditative process that
            helps you center yourself and feel heard.
          </h4>
          <p className="mb-5">
            <em>Log in to send your message to the universe.</em>
          </p>
          <a href="/login" className="btn read-note-btn mb-5">
            Log in
          </a>
        </>
      )}
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

export default TalkToUniverse;