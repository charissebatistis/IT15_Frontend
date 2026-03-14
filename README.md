# IT15 Integrative Programming Final Project

This is my complete school management system with a React frontend and Laravel backend. It shows a dashboard with 550 students, 23 courses, attendance tracking, and a weather widget. Everything works with a secure API.

## System Overview

I built a full-stack application that lets you see:
- Dashboard with charts about students and courses
- List of 550 students with search and filtering
- List of 20 courses across 4 departments
- Academic calendar with important dates
- Live weather for Philippine cities
- Secure login system

It's basically a school information system where you can browse students and courses, see analytics, and check the weather. Data comes from a Laravel API backend that I seeded with 550 realistic student records.

Features

Authentication - Email/password login with bearer tokens
Dashboard - 4 charts showing enrollment, courses, attendance, departments
Student Directory - 550 students with search, filter, sort
Course Management - 23 courses organized by 5 departments
Academic Calendar - Important dates (exams, holidays, deadlines)
Weather Widget - Current weather and 5-day forecast
Responsive Design - Works on desktop, tablet, mobile
XSS Protection - DOMPurify sanitizes all user input



API Documentation

Here are all 17 API endpoints I built:

### Authentication

**POST /api/login**
```
Send email and password, get back a token

Request:
{
  "email": "student@example.com",
  "password": "password123"
}

Response:
{
  "token": "your_token_here",
  "user": {
    "id": 1,
    "name": "Juan Santos",
    "email": "student@example.com"
  }
}
```

**POST /api/logout**
```
Just clears your session
Headers: Authorization: Bearer your_token_here
```

**GET /api/user**
```
Get info about who's logged in
Headers: Authorization: Bearer your_token_here

Response:
{
  "id": 1,
  "name": "Juan Santos",
  "email": "student@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Students

**GET /api/students**
```
Get all 550 students (paginated)

Query params:
- page (default: 1)
- perPage (default: 15)
- search (search by name or email)
- year_level (filter by 1st, 2nd, 3rd, 4th Year)

Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Juan Santos",
      "email": "juan@example.com",
      "year_level": "4th Year",
      "department": "Computer Science",
      "gender": "Male"
    }
  ],
  "pagination": {
    "total": 550,
    "per_page": 15,
    "current_page": 1,
    "last_page": 37
  }
}
```

**GET /api/students/{id}**
```
Get one student's full details
Headers: Authorization: Bearer your_token_here

Response:
{
  "id": 1,
  "name": "Juan Santos",
  "email": "juan@example.com",
  "jd": "2020-08-15",
  "year_level": "4th Year",
  "gender": "Male",
  "address": "123 Mabuhay St, Manila",
  "courses": [array of courses]
}
```

**GET /api/students/course/{courseId}**
```
Get all students in a specific course
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [students array],
  "total": 45
}
```

**GET /api/students/statistics**
```
Get summary stats about students

Headers: Authorization: Bearer your_token_here

Response:
{
  "total_students": 550,
  "by_year_level": {
    "1st Year": 140,
    "2nd Year": 135,
    "3rd Year": 140,
    "4th Year": 135
  },
  "by_department": {
    "Computer Science": 110,
    "Information Technology": 110,
    "Business": 110,
    "Engineering": 110,
    "Liberal Arts": 110
  }
}
```

### Courses

**GET /api/courses**
```
Get all 23 courses (paginated)

Query params:
- page (default: 1)
- perPage (default: 15)
- department (filter)
- search (search by code or name)

Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {
      "id": 1,
      "code": "CS101",
      "name": "Introduction to Programming",
      "department": "Computer Science",
      "units": 3,
      "student_count": 45
    }
  ],
  "pagination": [...]
}
```

**GET /api/courses/{id}**
```
Get one course's details
Headers: Authorization: Bearer your_token_here

Response:
{
  "id": 1,
  "code": "CS101",
  "name": "Introduction to Programming",
  "department": "Computer Science",
  "description": "Learn programming fundamentals...",
  "units": 3,
  "enrolled_students": 45,
  "students": [array of student objects]
}
```

**GET /api/courses/department/{department}**
```
Get all courses from one department

Departments: Computer Science, Information Technology, Business, Engineering, Liberal Arts

Headers: Authorization: Bearer your_token_here

Response:
{
  "department": "Computer Science",
  "data": [courses array],
  "total": 5
}
```

**GET /api/courses/enrollment-stats**
```
See enrollment numbers for each course
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {
      "id": 1,
      "code": "CS101",
      "name": "Introduction to Programming",
      "enrolled_count": 45
    }
  ],
  "total_enrollments": 550
}
```

### Dashboard Analytics

**GET /api/dashboard/enrollment-stats**
```
Enrollment broken down by department
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {"department": "Computer Science", "count": 110},
    {"department": "Information Technology", "count": 110}
  ]
}
```

**GET /api/dashboard/attendance-stats**
```
Monthly attendance data
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {"month": "January", "present": 450, "absent": 100},
    {"month": "February", "present": 480, "absent": 70}
  ]
}
```

**GET /api/dashboard/course-distribution**
```
How students are spread across courses
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {"code": "CS101", "name": "Intro to Programming", "students": 45}
  ],
  "total_students": 550
}
```

**GET /api/dashboard/department-stats**
```
Stats by department
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {"name": "Computer Science", "student_count": 110, "course_count": 5}
  ],
  "total_departments": 5
}
```

**GET /api/dashboard/monthly-stats**
```
Overall monthly numbers
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {"month": "January", "new_students": 50, "active_courses": 23, "attendance_rate": 82.5}
  ]
}
```

**GET /api/dashboard/academic-calendar**
```
All important dates and events
Headers: Authorization: Bearer your_token_here

Response:
{
  "data": [
    {
      "id": 1,
      "title": "Midterm Exams",
      "date": "2024-02-15",
      "type": "exam",
      "description": "Midterm examination period"
    }
  ],
  "total_events": 15
}
```

## Technologies Used

Frontend
React 19.2.0- I picked React because components make sense and it scales well
React Router 7.13.0** - For navigating between pages without reloading
Vite 7.3.1** - Super fast build tool, way better than Create React App
Recharts 2.10.0 - For drawing charts without overcomplicating things
Axios** - Makes API calls way cleaner than fetch
DOMPurify 3.3.3*- Sanitizes user input to prevent XSS attacks
js-cookie** - For storing and managing auth tokens
ESLint 9.39.1 - Catches my mistakes before they become real problems
Node.js 18+ - JavaScript runtime

Backend
Laravel 11.x - Framework that has everything built in already (routing, migrations, seeding, etc.)
PHP 8.2+ - The language Laravel runs on
MySQL or PostgreSQL - Database to store students, courses, attendance data
Laravel Sanctum - Token-based API authentication, super simple
Composer - PHP package manager for dependencies
Laravel Tinker - For testing database queries quickly

External APIs
Open-Meteo Weather API - Free weather data, no API key needed

Setup Instructions

Backend Setup

bash
cd IT15_Backend
composer install
cp .env.example .env
php artisan key:generate

Run migrations and seeding
This creates all tables and populates with:
550 students
20 courses
Academic calendar events
php artisan migrate --seed
php artisan serve

Server runs on http://localhost:8000


Frontend Setup
Navigate to frontend
cd IT15_Frontend
npm install
npm run dev

Server runs on http://localhost:5173
npm run build
npm run preview

Open two terminals:
1. Terminal 1: `cd IT15_Backend && php artisan serve`
2. Terminal 2: `cd IT15_Frontend && npm run dev`

Then go to http://localhost:5173 in your browser and login with any student email from the database.

How to Login

After running `php artisan migrate --seed`, the database has 550 students.

Login with student credentials (format varies based on seeding, check the output or database):
- Example: `admin@umindanao.edu.ph` / `password123`

The Laravel console shows what accounts were created during seeding.

 How Everything Works

1. You enter email/password on the login page
2. Frontend sends it to `/api/login`
3. Backend checks the database, returns a token
4. Frontend stores the token in cookies
5. Every future request includes `Authorization: Bearer <token>`
6. Backend validates token and returns data
7. Charts, lists, and widgets populate with real data
8. If backend is down, frontend shows mock data as fallback

Project Structure

Frontend:
```
src/
├── components/           # React components
│   ├── Dashboard.jsx    # Main dashboard with charts
│   ├── Programlist.jsx  # Course list
│   ├── Subjectlist.jsx  # Course details
│   ├── *Chart.jsx       # Chart components
│   ├── auth/            # Login
│   ├── common/          # Navbar, loading, errors
│   └── weather/         # Weather widget
├── services/
│   ├── api.js          # Backend API calls
│   └── weatherApi.js   # Open-Meteo API calls
├── data/
│   └── mockData.js     # Fallback data
└── App.jsx             # Main app


Backend:

app/
├── Http/
│   ├── Controllers/    # All 17 endpoints
│   └── Middleware/     # Auth validation
├── Models/             # Database models
│   ├── User.php
│   ├── Student.php
│   ├── Course.php
│   ├── SchoolDay.php
│   └── Attendance.php
database/
├── migrations/         # Database tables
└── seeders/           # 550 students, 23 courses
routes/
└── api.php            # API route definitions
```

Database Models

User- Admin accounts
Studens - 550 students with full details
Course - 23 courses across 5 departments
SchoolDay - Academic calendar events (exams, holidays, etc.)
Attendance - Records of attendance


Troubleshooting

Backend won't start

php artisan key:generate
php artisan cache:clear
php artisan config:clear
php artisan serve
```

"Cannot connect to backend" error
- Check that `php artisan serve` is running
- Make sure frontend is trying to connect to http://localhost:8000
- Check browser console for actual error
 Login always fails
- Run `php artisan migrate --seed` again
- Check that database is properly configured in .env
- Look at Laravel error logs in `storage/logs/`

 Database won't seed

php artisan migrate:refresh  # Clears and recreates all tables
php artisan db:seed          # Runs seeders only

 Charts showing mock data
- Check that backend API is responding
- Open Network tab in DevTools to see API responses
- Make sure your token isn't expired

What I Built

This project combines:
- **React frontend** - Charts, student list, courses, calendar, weather
- **Laravel API** - 17 endpoints serving JSON data
- **MySQL database** - 550 students, 23 courses, attendance records
- **Authentication** - Token-based login with DOMPurify XSS protection
- **External API** - Real weather data from Open-Meteo

The frontend is read-only (you can view data but not edit). It demonstrates how to build a data-heavy dashboard with a backend API.

## What I Learned

- Building React components and managing state
- Creating Laravel APIs and routes
- Database design and relationships
- Authentication and token management
- Pagination and filtering
- Data visualization with Recharts
- Error handling and fallbacks
- Security (XSS prevention, input sanitization)

## Testing

To verify everything works:
1. Login should work
2. Charts should show enrollment by department, etc.
3. Student list should show 550 students
4. Course list should show 23 courses
5. Weather should show real data
6. Calendar should show seed events
7. Search and filters should work

## Notes

- All 550 students and 23 courses are seeded automatically
- Weather API is real, other data is generated
- DOMPurify prevents XSS by sanitizing all user input
- Tokens are encrypted and stored securely
- No sensitive data is stored
- Backend validates every request with auth middleware

okay that's it sir this is Ms. Batistis now signing off.

