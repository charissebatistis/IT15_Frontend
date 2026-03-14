/**
 * Mock Data Generator
 * Generates realistic mock data for 550 students and 20 courses
 * Used as fallback when API is unavailable
 */

const firstNames = [
  'John', 'Mary', 'James', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda', 'David', 'Barbara',
  'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy',
  'Mark', 'Lisa', 'Donald', 'Betty', 'Steven', 'Margaret', 'Paul', 'Sandra', 'Andrew', 'Ashley',
  'Joshua', 'Kimberly', 'Kenneth', 'Donna', 'Kevin', 'Emily', 'Brian', 'Melissa', 'George', 'Deborah',
  'Edward', 'Stephanie', 'Ronald', 'Rebecca', 'Anthony', 'Sharon', 'Frank', 'Laura', 'Ryan', 'Cynthia',
  'Chelsea', 'Nicole', 'Ahtisa', 'Charisse', 'Juliana', 'Mary Grace', 'Kim bee', 'Genevieve'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Peterson', 'Phillips', 'Campbell',
  'Parker', 'Evans', 'Edwards', 'Collins', 'Reeves', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook',
  'Fernandez', 'Borromeo', 'Manalo', 'Batistis', 'Gacayan', 'Bautista', 'Morilla', 'Herrera'
];

const departments = ['Computer Science', 'Information Technology', 'Business', 'Engineering', 'Liberal Arts'];

export const generateMockCourses = () => {
  const courses = [
    // Computer Science
    { id: 1, course_code: 'CS101', course_name: 'Introduction to Programming', department: 'Computer Science', description: 'Learn the basics of programming', credits: 3, instructor: 'Dr. Johnson', capacity: 50, current_enrollment: 0 },
    { id: 2, course_code: 'CS201', course_name: 'Data Structures', department: 'Computer Science', description: 'Advanced data structures and algorithms', credits: 4, instructor: 'Prof. Smith', capacity: 40, current_enrollment: 0 },
    { id: 3, course_code: 'CS301', course_name: 'Web Development', department: 'Computer Science', description: 'Building web applications', credits: 3, instructor: 'Dr. Williams', capacity: 45, current_enrollment: 0 },
    { id: 4, course_code: 'CS401', course_name: 'Database Systems', department: 'Computer Science', description: 'SQL and database design', credits: 4, instructor: 'Prof. Brown', capacity: 35, current_enrollment: 0 },
    { id: 5, course_code: 'CS501', course_name: 'Machine Learning', department: 'Computer Science', description: 'AI and machine learning fundamentals', credits: 4, instructor: 'Dr. Davis', capacity: 30, current_enrollment: 0 },
    
    // Information Technology
    { id: 6, course_code: 'IT101', course_name: 'IT Fundamentals', department: 'Information Technology', description: 'Basic IT concepts', credits: 3, instructor: 'Prof. Miller', capacity: 50, current_enrollment: 0 },
    { id: 7, course_code: 'IT201', course_name: 'Network Administration', department: 'Information Technology', description: 'Managing networks', credits: 4, instructor: 'Dr. Wilson', capacity: 40, current_enrollment: 0 },
    { id: 8, course_code: 'IT301', course_name: 'Cybersecurity Basics', department: 'Information Technology', description: 'Security fundamentals', credits: 3, instructor: 'Prof. Moore', capacity: 35, current_enrollment: 0 },
    { id: 9, course_code: 'IT401', course_name: 'Cloud Computing', department: 'Information Technology', description: 'Cloud platforms and services', credits: 4, instructor: 'Dr. Johnson', capacity: 40, current_enrollment: 0 },
    { id: 10, course_code: 'IT501', course_name: 'System Administration', department: 'Information Technology', description: 'Server and system management', credits: 4, instructor: 'Prof. Smith', capacity: 30, current_enrollment: 0 },
    
    // Business
    { id: 11, course_code: 'BUS101', course_name: 'Business Fundamentals', department: 'Business', description: 'Introduction to business', credits: 3, instructor: 'Dr. Williams', capacity: 60, current_enrollment: 0 },
    { id: 12, course_code: 'BUS201', course_name: 'Accounting', department: 'Business', description: 'Financial accounting principles', credits: 4, instructor: 'Prof. Brown', capacity: 50, current_enrollment: 0 },
    { id: 13, course_code: 'BUS301', course_name: 'Marketing Strategy', department: 'Business', description: 'Strategic marketing concepts', credits: 3, instructor: 'Dr. Davis', capacity: 45, current_enrollment: 0 },
    { id: 14, course_code: 'BUS401', course_name: 'Management', department: 'Business', description: 'Organizational management', credits: 3, instructor: 'Prof. Miller', capacity: 50, current_enrollment: 0 },
    { id: 15, course_code: 'BUS501', course_name: 'Finance', department: 'Business', description: 'Corporate finance', credits: 4, instructor: 'Dr. Wilson', capacity: 40, current_enrollment: 0 },
    
    // Engineering
    { id: 16, course_code: 'ENG101', course_name: 'Engineering Fundamentals', department: 'Engineering', description: 'Basic engineering concepts', credits: 4, instructor: 'Prof. Moore', capacity: 45, current_enrollment: 0 },
    { id: 17, course_code: 'ENG201', course_name: 'Mechanical Engineering', department: 'Engineering', description: 'Mechanics and machines', credits: 4, instructor: 'Dr. Johnson', capacity: 40, current_enrollment: 0 },
    { id: 18, course_code: 'ENG301', course_name: 'Electrical Engineering', department: 'Engineering', description: 'Electrical systems', credits: 4, instructor: 'Prof. Smith', capacity: 35, current_enrollment: 0 },
    { id: 19, course_code: 'ENG401', course_name: 'Civil Engineering', department: 'Engineering', description: 'Construction and structures', credits: 4, instructor: 'Dr. Williams', capacity: 40, current_enrollment: 0 },
    { id: 20, course_code: 'ENG501', course_name: 'Software Engineering', department: 'Engineering', description: 'Software development methodology', credits: 4, instructor: 'Prof. Brown', capacity: 35, current_enrollment: 0 },
  ];
  return courses;
};

export const generateMockStudents = (count = 550) => {
  const courses = generateMockCourses();
  const students = [];
  const genders = ['Male', 'Female', 'Other'];

  // Special students
  const specialNames = [
    { firstName: 'Chelsea', lastName: 'Fernandez' },
    { firstName: 'Nicole', lastName: 'Borromeo' },
    { firstName: 'Ahtisa', lastName: 'Manalo' },
    { firstName: 'Charisse', lastName: 'Batistis' },
    { firstName: 'Juliana', lastName: 'Gacayan' },
    { firstName: 'Mary Grace', lastName: 'Bautista' },
    { firstName: 'Kim bee', lastName: 'Morilla' },
    { firstName: 'Genevieve', lastName: 'Herrera' },
  ];

  // Add special students first
  specialNames.forEach((name, index) => {
    const course = courses[Math.floor(Math.random() * courses.length)];
    const yearLevel = Math.floor(Math.random() * 4) + 1;
    
    students.push({
      id: index + 1,
      fullName: `${name.firstName} ${name.lastName}`,
      firstName: name.firstName,
      lastName: name.lastName,
      studentId: `STU${String(index + 1).padStart(6, '0')}`,
      email: `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@student.edu`,
      phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      address: `${Math.floor(Math.random() * 999) + 1} Street Name`,
      dateOfBirth: `${1999 + Math.floor(Math.random() * 6)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      enrolledAt: `202${Math.floor(Math.random() * 4)}-08-01`,
      yearLevel: yearLevel,
      courseId: course.id,
      courseCode: course.course_code,
      courseName: course.course_name,
      department: course.department,
    });
  });

  // Generate remaining students
  for (let i = specialNames.length; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const course = courses[Math.floor(Math.random() * courses.length)];
    const yearLevel = Math.floor(Math.random() * 4) + 1;

    students.push({
      id: i + 1,
      fullName: `${firstName} ${lastName}`,
      firstName: firstName,
      lastName: lastName,
      studentId: `STU${String(i + 1).padStart(6, '0')}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@student.edu`,
      phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      address: `${Math.floor(Math.random() * 999) + 1} Street Name`,
      dateOfBirth: `${1999 + Math.floor(Math.random() * 6)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      enrolledAt: `202${Math.floor(Math.random() * 4)}-08-01`,
      yearLevel: yearLevel,
      courseId: course.id,
      courseCode: course.course_code,
      courseName: course.course_name,
      department: course.department,
    });
  }

  return students;
};
