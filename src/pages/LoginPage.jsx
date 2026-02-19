import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('studentAccount'));

      if (!storedUser) {
        alert('No account found. Please register first!');
      } else if (storedUser.id === id && storedUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(storedUser));
        alert(`Welcome back, ${storedUser.name}!`);
        navigate('/dashboard');
      } else {
        alert('Invalid ID or Password. Please try again.');
      }

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="glass-card">
        <div
          className={`lion-logo ${
            isPasswordFocused
              ? showPassword
                ? 'lion-cover-mouth'
                : 'lion-cover-eyes'
              : ''
          }`}
          aria-hidden="true"
        >
          <div className="lion-ear lion-ear-left"></div>
          <div className="lion-ear lion-ear-right"></div>
          <div className="lion-face">
            <div className="lion-eye lion-eye-left"></div>
            <div className="lion-eye lion-eye-right"></div>
            <div className="lion-nose"></div>
            <div className="lion-mouth"></div>
          </div>
          <div className="lion-paw lion-paw-left"></div>
          <div className="lion-paw lion-paw-right"></div>
        </div>

        <h1 className="title">EduPortal</h1>
        <p className="subtitle">Enrollment & Student Management</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">University ID</label>
            <input
              className={`login-input ${id.length > 5 ? 'input-valid' : ''}`}
              placeholder="e.g. 2026-0001"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                className="login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <button
                type="button"
                className="toggle-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className={`eye-icon ${showPassword ? 'closed' : 'open'}`} aria-hidden="true">
                  <span className="eye-outline"></span>
                  <span className="eye-pupil"></span>
                  <span className="eye-slash"></span>
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`sign-in-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : 'Authenticate Access'}
          </button>
        </form>

        <div className="footer-text">
          <span>First time here? </span>
          <Link to="/register" className="register-link">Register Student</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
