import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangsaysLogo from '../components/ChangsaysLogo';
import './LoginPage.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const loginUser = {
        name: 'Guest Student',
        id,
      };
      localStorage.setItem('currentUser', JSON.stringify(loginUser));
      alert(`Welcome, ${loginUser.name}!`);
      navigate('/dashboard');

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="glass-card">
        <ChangsaysLogo forceText />

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
      </div>
    </div>
  );
};

export default LoginPage;
