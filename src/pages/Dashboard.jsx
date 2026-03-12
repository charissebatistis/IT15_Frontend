import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Programlist from '../components/Programlist';
import Subjectlist from '../components/Subjectlist';
import WeatherPanel from '../components/WeatherPanel';
import Chatbox from '../components/Chatbox';
import ChangsaysLogo from '../components/ChangsaysLogo';
import { dashboardAPI, programAPI, subjectAPI } from '../services/api';
import './OfferingsPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const currentUserRaw = localStorage.getItem('currentUser');
  const currentUser = useMemo(() => {
    if (!currentUserRaw) {
      return null;
    }

    try {
      return JSON.parse(currentUserRaw);
    } catch (error) {
      console.error('Failed to parse current user:', error);
      return null;
    }
  }, [currentUserRaw]);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [programs, setPrograms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashSummary = await dashboardAPI.getSummary();

        setDashboardStats({
          stats: dashSummary.stats,
          enrollmentData: dashSummary.enrollment_trend,
          courseData: dashSummary.course_distribution,
          attendanceData: dashSummary.attendance_trend,
          departmentData: dashSummary.department_distribution,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUserRaw]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!currentUser || programs.length > 0) {
        return;
      }

      try {
        const coursesRes = await programAPI.getAll();
        const coursesData = Array.isArray(coursesRes) ? coursesRes : (coursesRes.data || []);
        setPrograms(coursesData);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };

    if (activeModule === 'programs') {
      fetchPrograms();
    }
  }, [activeModule, currentUserRaw, programs.length]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!currentUser || subjects.length > 0) {
        return;
      }

      try {
        const studentsRes = await subjectAPI.getAll();
        const studentsData = Array.isArray(studentsRes) ? studentsRes : (studentsRes.data || []);
        const normalizedStudents = studentsData.map((student) => ({
          id: student.id,
          fullName: `${student.first_name} ${student.last_name}`,
          firstName: student.first_name,
          lastName: student.last_name,
          studentId: student.student_id,
          email: student.email,
          phone: student.phone,
          gender: student.gender,
          address: student.address,
          dateOfBirth: student.date_of_birth,
          enrolledAt: student.enrollment_date,
          yearLevel: student.year_level,
          courseId: student.course_id,
          courseCode: student.course?.course_code || 'N/A',
          courseName: student.course?.course_name || 'Unassigned',
          department: student.course?.department || 'N/A',
        }));
        setSubjects(normalizedStudents);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    if (activeModule === 'subjects') {
      fetchSubjects();
    }
  }, [activeModule, currentUserRaw, subjects.length]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <main className="offerings-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <section className="offerings-shell">
        <header className="page-header">
          <div className="page-brand">
            <ChangsaysLogo compact />
            <p>
              Welcome to the campus where Chang says, everyone slays. ({currentUser.email || currentUser.id})
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
            Courses
          </button>
          <button
            type="button"
            className={activeModule === 'subjects' ? 'tab active' : 'tab'}
            onClick={() => setActiveModule('subjects')}
          >
            Students
          </button>
        </nav>

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {activeModule === 'dashboard' && <Dashboard programs={programs} subjects={subjects} stats={dashboardStats} />}
            {activeModule === 'programs' && <Programlist programs={programs} subjects={subjects} />}
            {activeModule === 'subjects' && <Subjectlist subjects={subjects} programs={programs} />}
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
