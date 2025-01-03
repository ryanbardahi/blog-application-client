import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Notes from './pages/Notes';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Resources from './pages/Resources';
import TalkToUniverse from './pages/TalkToUniverse';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <header>
            <h1 className="page-title">the meditation notes</h1>
          </header>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/talk-to-the-universe" element={<TalkToUniverse />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;