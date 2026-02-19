import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Save data to LocalStorage (This acts as our "Database")
      localStorage.setItem('studentAccount', JSON.stringify(formData));
      
      alert("Registration Successful! You can now log in.");
      setIsLoading(false);
      navigate('/'); // Redirect to Login page
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      <div className="glass-card">
        <h1 className="title">Register</h1>
        <p className="subtitle">Create your student account</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="login-input" 
              placeholder="Juan Dela Cruz" 
              required 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />

            <label className="form-label">Desired Student ID</label>
            <input 
              className="login-input" 
              placeholder="2026-0001" 
              required 
              onChange={(e) => setFormData({...formData, id: e.target.value})}
            />

            <label className="form-label">Password</label>
            <input 
              className="login-input" 
              type="password" 
              placeholder="••••••••" 
              required 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" className={`sign-in-btn ${isLoading ? 'loading' : ''}`}>
            {isLoading ? <span className="spinner"></span> : 'Create Account'}
          </button>
        </form>

        <div className="footer-text">
          <span>Already have an account? </span>
          <Link to="/" className="register-link">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;