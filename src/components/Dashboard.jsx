import React, { useEffect, useState } from 'react';
import EnrollmentChart from './EnrollmentChart';
import CourseDistributionChart from './CourseDistributionChart';
import AttendanceChart from './AttendanceChart';
import './Dashboard.css';

const Dashboard = ({ programs = [], subjects = [], stats = null }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (stats && stats.enrollmentData && stats.courseData && stats.attendanceData && stats.departmentData) {
      console.log('Dashboard data loaded:', stats);
      setLoading(false);
    }
  }, [stats]);

  if (loading) {
    return <div className="dashboard loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Academic Dashboard</h2>
        <p>Overview of students, courses, and attendance</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats && (
          <>
            <div className="stat-card">
              <h3>Total Students</h3>
              <p className="stat-value">{stats.stats?.total_students || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Total Courses</h3>
              <p className="stat-value">{stats.stats?.total_courses || 0}</p>
            </div>
            <div className="stat-card">
              <h3>Average Attendance</h3>
              <p className="stat-value">{stats.stats?.average_attendance || 0}%</p>
            </div>
            <div className="stat-card">
              <h3>Total Enrollments</h3>
              <p className="stat-value">{stats.stats?.total_enrollments || 0}</p>
            </div>
          </>
        )}
      </div>

      {/* Charts */}
      <div className="charts-container">
        {stats.enrollmentData && (
          <div className="chart-section">
            <h3>Monthly Enrollment Trend</h3>
            <EnrollmentChart data={stats.enrollmentData} />
          </div>
        )}

        {stats.courseData && (
          <div className="chart-section">
            <h3>Course Distribution</h3>
            <CourseDistributionChart data={stats.courseData} />
          </div>
        )}

        {stats.attendanceData && (
          <div className="chart-section">
            <h3>Attendance Trend (Last 3 Months)</h3>
            <AttendanceChart data={stats.attendanceData} />
          </div>
        )}

        {stats.departmentData && (
          <div className="chart-section">
            <h3>Students by Department</h3>
            <CourseDistributionChart data={stats.departmentData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
