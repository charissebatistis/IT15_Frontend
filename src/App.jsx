/**
 * Root Application Component
 * 
 * Sets up:
 * - Route navigation (Login, Dashboard)
 * - Global error boundary for error handling
 * - Router context for navigation
 * 
 * Route Structure:
 * /          - LoginPage (public)
 * /dashboard - DashboardPage (protected by backend auth)
 */

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/Dashboard.jsx';

/**
 * Main App Component
 * Wrapped with ErrorBoundary in main.jsx for global error handling
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
