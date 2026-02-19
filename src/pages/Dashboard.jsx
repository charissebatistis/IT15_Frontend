import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="glass-card">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">Welcome, {currentUser.name}</p>

        <p className="subtitle">Student ID: {currentUser.id}</p>

        <button type="button" className="sign-in-btn" onClick={handleLogout}>
          Log Out
        </button>

        <div className="footer-text" style={{ marginTop: '16px' }}>
          <Link to="/" className="register-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
