import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user = null, onLogout = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Changsay's University</h1>
      </div>
      {user && (
        <div className="navbar-user">
          <span className="navbar-username">{user.name}</span>
          <button type="button" className="navbar-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
