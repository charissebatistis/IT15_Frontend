// API Service - Handles all requests to the backend
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Generic fetch wrapper for API calls
 * @param {string} endpoint - API endpoint (e.g., '/users', '/login')
 * @param {object} options - Fetch options (method, body, headers)
 * @returns {Promise} Response data
 */
const api = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Get auth token from localStorage
  const token = localStorage.getItem('authToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// ============================================
// Auth Endpoints (Laravel)
// ============================================
export const authAPI = {
  login: (credentials) => api('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  logout: () => api('/logout', {
    method: 'POST',
  }),

  register: (userData) => api('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  getCurrentUser: () => api('/user', {
    method: 'GET',
  }),
};

// ============================================
// Program/Course Endpoints (Laravel)
// ============================================
export const programAPI = {
  getAll: () => api('/courses', {
    method: 'GET',
  }),

  getById: (id) => api(`/courses/${id}`, {
    method: 'GET',
  }),

  byDepartment: (department) => api(`/courses/department/${department}`, {
    method: 'GET',
  }),

  getStats: () => api('/courses-stats', {
    method: 'GET',
  }),
};

// ============================================
// Student Endpoints (Laravel)
// ============================================
export const subjectAPI = {
  getAll: () => api('/students', {
    method: 'GET',
  }),

  getById: (id) => api(`/students/${id}`, {
    method: 'GET',
  }),

  getByCourse: (courseId) => api(`/students/course/${courseId}`, {
    method: 'GET',
  }),

  getStats: () => api('/students-stats', {
    method: 'GET',
  }),
};

// ============================================
// Dashboard Endpoints (Laravel)
// ============================================
export const dashboardAPI = {
  getStats: () => api('/dashboard/stats', {
    method: 'GET',
  }),

  getEnrollmentTrend: () => api('/dashboard/enrollment-trend', {
    method: 'GET',
  }),

  getCourseDistribution: () => api('/dashboard/course-distribution', {
    method: 'GET',
  }),

  getAttendanceTrend: () => api('/dashboard/attendance-trend', {
    method: 'GET',
  }),

  getDepartmentDistribution: () => api('/dashboard/department-distribution', {
    method: 'GET',
  }),

  getSummary: () => api('/dashboard/summary', {
    method: 'GET',
  }),
};

export default api;
