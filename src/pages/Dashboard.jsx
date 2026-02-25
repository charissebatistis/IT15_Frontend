import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Programlist from '../components/Programlist';
import Subjectlist from '../components/Subjectlist';
import WeatherPanel from '../components/WeatherPanel';
import Chatbox from '../components/Chatbox';
import { programs, subjects } from '../data/mockData';
import './OfferingsPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [activeModule, setActiveModule] = useState('dashboard');

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <main className="offerings-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <section className="offerings-shell">
        <header className="page-header">
          <div>
            <h1>University of Changsays</h1>
            <p>
              Welcome to the campus where Chang says, everyone slays. ({currentUser.id})
            </p>
          </div>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </header>

        <section className="top-utilities">
          <WeatherPanel compact />
          <Chatbox compact />
        </section>

        <nav className="module-tabs">
          <button
            type="button"
            className={activeModule === 'dashboard' ? 'tab active' : 'tab'}
            onClick={() => setActiveModule('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={activeModule === 'programs' ? 'tab active' : 'tab'}
            onClick={() => setActiveModule('programs')}
          >
            Program Offerings
          </button>
          <button
            type="button"
            className={activeModule === 'subjects' ? 'tab active' : 'tab'}
            onClick={() => setActiveModule('subjects')}
          >
            Subject Offerings
          </button>
        </nav>

        {activeModule === 'dashboard' && <Dashboard programs={programs} subjects={subjects} />}
        {activeModule === 'programs' && <Programlist programs={programs} subjects={subjects} />}
        {activeModule === 'subjects' && <Subjectlist subjects={subjects} programs={programs} />}
      </section>
    </main>
  );
};

export default DashboardPage;
