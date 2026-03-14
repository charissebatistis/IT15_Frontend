/**
 * Dashboard Page Component
 * Main application page after login
 * 
 * Features:
 * - Multi-module dashboard (Dashboard, Courses, Students)
 * - Interactive profile menu with logout
 * - Real-time weather integration
 * - Student and course data display
 * - Chart visualizations
 * - Error handling and loading states
 * 
 * Security:
 * - User authentication verification
 * - Token-based API requests
 * - Safe JSON parsing with error handling
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Programlist from '../components/Programlist';
import Subjectlist from '../components/Subjectlist';
import AcademicCalendar from '../components/AcademicCalendar';
import { WeatherPanel } from '../components/weather';
import Chatbox from '../components/Chatbox';
import { dashboardAPI, programAPI, subjectAPI } from '../services/api';
import { generateMockStudents, generateMockCourses } from '../utils/mockDataGenerator';
import './OfferingsPage.css';

/**
 * Main Dashboard Page
 * Renders authenticated user dashboard with multiple modules
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Retrieve and safely parse current user from secure storage
  const currentUserRaw = localStorage.getItem('currentUser');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  /**
   * Safely parse user data from localStorage
   * Falls back to null if parsing fails (corrupted data)
   */
  const currentUser = useMemo(() => {
    if (!currentUserRaw) {
      return null;
    }

    try {
      return JSON.parse(currentUserRaw);
    } catch (error) {
      // Log parsing error but don't crash app
      console.error('Failed to parse current user:', error);
      return null;
    }
  }, [currentUserRaw]);
  
  // Module state management
  const [activeModule, setActiveModule] = useState('dashboard');
  
  // Data state management
  const [programs, setPrograms] = useState(generateMockCourses());
  const [subjects, setSubjects] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    stats: { total_students: 5, total_courses: 30, average_attendance: 88, total_enrollments: 250 },
    enrollmentData: {
      data: [
        { month: 'January', total: 120 },
        { month: 'February', total: 145 },
        { month: 'March', total: 168 },
        { month: 'April', total: 195 },
        { month: 'May', total: 220 },
        { month: 'June', total: 245 },
      ]
    },
    courseData: { data: [] },
    attendanceData: { data: [] },
    departmentData: { data: [] },
  });
  
  // UI state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all dashboard data on component mount
   * Includes: dashboard stats, programs, subjects
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashSummary = await dashboardAPI.getSummary();

        // Mock enrollment data as fallback
        const mockEnrollmentData = [
          { month: 'January', total: 120 },
          { month: 'February', total: 145 },
          { month: 'March', total: 168 },
          { month: 'April', total: 195 },
          { month: 'May', total: 220 },
          { month: 'June', total: 245 },
        ];

        // Ensure data is always in correct format
        const enrollmentTrend = dashSummary?.enrollment_trend;
        const courseDistribution = dashSummary?.course_distribution;
        const attendanceTrend = dashSummary?.attendance_trend;
        const departmentDistribution = dashSummary?.department_distribution;

        setDashboardStats({
          stats: dashSummary?.stats || { total_students: 0, total_courses: 0, average_attendance: 0, total_enrollments: 0 },
          enrollmentData: {
            data: (Array.isArray(enrollmentTrend) && enrollmentTrend.length > 0) 
              ? enrollmentTrend 
              : mockEnrollmentData
          },
          courseData: {
            data: (Array.isArray(courseDistribution) && courseDistribution.length > 0) 
              ? courseDistribution 
              : []
          },
          attendanceData: {
            data: (Array.isArray(attendanceTrend) && attendanceTrend.length > 0) 
              ? attendanceTrend 
              : []
          },
          departmentData: {
            data: (Array.isArray(departmentDistribution) && departmentDistribution.length > 0) 
              ? departmentDistribution 
              : []
          },
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        
        // Fallback mock data when API fails
        const mockEnrollmentData = [
          { month: 'January', total: 120 },
          { month: 'February', total: 145 },
          { month: 'March', total: 168 },
          { month: 'April', total: 195 },
          { month: 'May', total: 220 },
          { month: 'June', total: 245 },
        ];

        setDashboardStats({
          stats: { total_students: 0, total_courses: 0, average_attendance: 0, total_enrollments: 0 },
          enrollmentData: { data: mockEnrollmentData },
          courseData: { data: [] },
          attendanceData: { data: [] },
          departmentData: { data: [] },
        });
        setError('Failed to load dashboard data - showing sample data');
      } finally {
        setLoading(false);
      }
    };

    // Always try to fetch dashboard data on mount
    // Use mock data if currentUser not available or API fails
    fetchDashboardData();
  }, [currentUserRaw]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!currentUser) {
        return;
      }

      try {
        const coursesRes = await programAPI.getAll();
        const coursesData = Array.isArray(coursesRes) ? coursesRes : (coursesRes.data || []);
        if (coursesData.length > 0) {
          setPrograms(coursesData);
        } else {
          // Fallback to mock courses if API returns empty
          setPrograms(generateMockCourses());
        }
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        // Fallback to mock courses on error
        setPrograms(generateMockCourses());
      }
    };

    if (activeModule === 'programs') {
      fetchPrograms();
    }
  }, [activeModule, currentUserRaw]);

  // Initialize with mock student data on mount
  useEffect(() => {
    setSubjects(generateMockStudents(550));
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      // Mock student data as fallback
      const mockStudents = generateMockStudents(550);

      try {
        let allStudents = [];
        let page = 1;
        let hasMore = true;
        const pageSize = 15; // Backend returns 15 per page by default

        while (hasMore) {
          const pageParam = page === 1 ? '' : `?page=${page}`;
          const studentsRes = await subjectAPI.getAll(pageParam);
          const studentsData = Array.isArray(studentsRes) ? studentsRes : (studentsRes.data || []);
          
          if (studentsData.length === 0) {
            hasMore = false;
            break;
          }

          allStudents.push(...studentsData);

          // If we got fewer than pageSize items, we've reached the end
          if (studentsData.length < pageSize) {
            hasMore = false;
          } else {
            page++;
          }
        }

        if (allStudents.length > 0) {
          const normalizedStudents = allStudents.map((student) => ({
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
          console.log(`Fetched ${normalizedStudents.length} total students`);
          setSubjects(normalizedStudents);
        } else {
          // Use mock data if API returns empty
          console.log('No students from API, using sample data');
          setSubjects(mockStudents);
        }
      } catch (err) {
        console.error('Failed to fetch students:', err);
        // Fallback to mock data on error
        setSubjects(mockStudents);
      }
    };

    // Fetch students when component mounts or Students tab is active
    if (currentUser && subjects.length === 0) {
      fetchSubjects();
    }
  }, [currentUser]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileMenu(false);
    };

    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showProfileMenu]);

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
          <div className="profile-header-card" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="profile-avatar-small">{currentUser?.name?.charAt(0).toUpperCase() || 'U'}</div>
            <div className="profile-info">
              <p className="profile-name-small">{currentUser?.name || 'User'}</p>
              <span className="profile-badge-small">Admin</span>
            </div>
            {showProfileMenu && (
              <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-item profile-details">
                  <p className="dropdown-name">{currentUser?.name}</p>
                  <p className="dropdown-email">{currentUser?.email}</p>
                </div>
                <button type="button" className="dropdown-item logout-item" onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}>
                  Log Out
                </button>
              </div>
            )}
          </div>

          <div className="page-brand">
            <h2>Changsay's University Dashboard</h2>
          </div>
          
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </header>

        <section className="top-utilities">
          <WeatherPanel />
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
          <button
            type="button"
            className={activeModule === 'calendar' ? 'tab active' : 'tab'}
            onClick={() => setActiveModule('calendar')}
          >
            Academic Calendar
          </button>
        </nav>

        {loading && !dashboardStats ? (
          <div className="loading">Loading data...</div>
        ) : error && !dashboardStats ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {activeModule === 'dashboard' && <Dashboard programs={programs} subjects={subjects} stats={dashboardStats} />}
            {activeModule === 'programs' && <Programlist programs={programs} subjects={subjects} />}
            {activeModule === 'subjects' && <Subjectlist subjects={subjects} programs={programs} />}
            {activeModule === 'calendar' && <AcademicCalendar />}
          </>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
