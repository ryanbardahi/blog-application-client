import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="logout-page container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>Logging you out...</h2>
    </div>
  );
};

export default Logout;