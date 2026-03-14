import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { authAPI } from '../services/api';
import { LoadingSpinner } from '../components/common';
import './LoginPage.css';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Sanitize user input to prevent XSS attacks
   * @param {string} input - Raw user input
   * @returns {string} Sanitized input
   */
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

   
    const sanitizedEmail = sanitizeInput(email.trim()).toLowerCase();
    
    
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

   
    const sanitizedPassword = sanitizeInput(password);
    
   
    if (!sanitizedPassword) {
      setErrorMessage('Password cannot be empty.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

     
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));

      alert(`Welcome, ${response.user.name}!`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="glass-card">
        <div className={`lion-logo ${showPassword ? 'lion-cover-eyes' : ''}`}>
          <div className="lion-face">
            <div className="lion-ear lion-ear-left"></div>
            <div className="lion-ear lion-ear-right"></div>
            <div className="lion-eye lion-eye-left"></div>
            <div className="lion-eye lion-eye-right"></div>
            <div className="lion-nose"></div>
            <div className="lion-mouth"></div>
          </div>
          <div className="lion-paw lion-paw-left"></div>
          <div className="lion-paw lion-paw-right"></div>
        </div>
        <h1 className="logo-title">Changsay's University</h1>

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
