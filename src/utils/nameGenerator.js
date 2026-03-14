/**
 * Name Generator Utility
 * Generates unique first and last names for students
 */

const firstNames = [
  'John', 'Maria', 'James', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
  'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
  'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna', 'Stephen', 'Brenda',
  'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen',
  'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Frank', 'Christine', 'Gregory', 'Debra',
  'Alexander', 'Rachel', 'Raymond', 'Catherine', 'Patrick', 'Carolyn', 'Jack', 'Janet',
  'Dennis', 'Ruth', 'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron', 'Diane'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Peterson', 'Phillips', 'Campbell',
  'Parker', 'Evans', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales',
  'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Peterson', 'Cooper',
  'Peterson', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons',
  'Bryant', 'Alexander', 'Russell', 'Griffin', 'Hayes', 'Lowe', 'Myers', 'Ford',
  'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan',
  'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harper', 'Mason', 'Howell', 'Snyder',
  'Lawson', 'Crabtree', 'Paul', 'Manning', 'Finley', 'Walton', 'Pena', 'Silva'
];

/**
 * Generate unique student names
 * Creates unique first/last name combinations by cycling through name pools
 * @param {number} count - Number of unique names to generate
 * @returns {Array} Array of objects with firstName and lastName
 */
export const generateUniqueStudentNames = (count) => {
  const names = [];
  const usedCombinations = new Set();

  for (let i = 0; i < count; i++) {
    let firstName, lastName;
    let attempts = 0;
    const maxAttempts = 10;

    // Try to generate a unique combination
    do {
      firstName = firstNames[i % firstNames.length];
      lastName = lastNames[(i + Math.floor(i / firstNames.length)) % lastNames.length];
      attempts++;
    } while (usedCombinations.has(`${firstName} ${lastName}`) && attempts < maxAttempts);

    if (attempts < maxAttempts) {
      usedCombinations.add(`${firstName} ${lastName}`);
      names.push({ firstName, lastName });
    }
  }

  return names;
};

/**
 * Get unique names for students
 * Uses student ID to ensure consistent name assignment
 * @param {number} studentId - Student ID for consistent name generation
 * @returns {object} Object with firstName and lastName
 */
export const getUniqueNameForStudent = (studentId) => {
  const index = studentId % (firstNames.length * lastNames.length);
  const firstIndex = index % firstNames.length;
  const lastIndex = Math.floor(index / firstNames.length) % lastNames.length;

  return {
    firstName: firstNames[firstIndex],
    lastName: lastNames[lastIndex],
  };
};
