import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangsaysLogo from '../components/ChangsaysLogo';
import './LoginPage.css';

const VALID_USERS = [
  {
    email: 'student@university.edu',
    password: 'changsays123',
    name: 'Guest Student',
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const matchedUser = VALID_USERS.find(
      (user) => user.email === normalizedEmail && user.password === password
    );

    if (!matchedUser) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const loginUser = {
        name: matchedUser.name,
        email: matchedUser.email,
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
            <label className="form-label">Email</label>
            <input
              className={`login-input ${EMAIL_REGEX.test(email) ? 'input-valid' : ''}`}
              type="email"
              placeholder="e.g. student@university.edu"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
            />
           
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                className="login-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
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

          {errorMessage && <p className="form-error">{errorMessage}</p>}
          
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
