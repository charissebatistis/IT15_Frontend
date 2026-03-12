# Frontend & Backend Connection Guide

## Quick Start

### 1. **Backend Setup**
Make sure your Node.js/Express backend is running on port 3000:
```bash
cd ../IT15_Backend
npm install
npm start
# Backend should be running at http://localhost:3000
```

### 2. **Frontend Setup**
In a new terminal, start your React frontend:
```bash
npm install
npm run dev
# Frontend runs at http://localhost:5173 (Vite default)
```

---

## How to Use the API Service

### Example: Login Component

```jsx
import { useState } from 'react';
import { authAPI } from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({ email, password });
      console.log('Login successful:', response);
      // Store token or redirect user
    } catch (err) {
      setError('Login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginPage;
```

### Example: Fetching Programs

```jsx
import { useEffect, useState } from 'react';
import { programAPI } from '../services/api';

function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programAPI.getAll();
        setPrograms(data);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {programs.map((program) => (
        <li key={program.id}>{program.name}</li>
      ))}
    </ul>
  );
}

export default ProgramList;
```

---

## How It Works

1. **Environment Variable**: `VITE_API_URL` is set in `.env` files
2. **API Service** (`src/services/api.js`): 
   - Handles all HTTP requests to your backend
   - Organized by feature (auth, programs, subjects, etc.)
   - Uses `fetch()` API with error handling
3. **Development Proxy** (vite.config.js):
   - Proxies requests to `http://localhost:3000`
   - Prevents CORS issues during development
4. **Components**: Import and use the API functions as needed

---

## Backend Endpoints

Your backend should provide these endpoints (customize if different):

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Programs
- `GET /programs` - List all programs
- `GET /programs/:id` - Get single program
- `POST /programs` - Create program
- `PUT /programs/:id` - Update program
- `DELETE /programs/:id` - Delete program

### Subjects
- `GET /subjects` - List all subjects
- `GET /subjects/:id` - Get single subject
- `POST /subjects` - Create subject
- `PUT /subjects/:id` - Update subject
- `DELETE /subjects/:id` - Delete subject

**Adjust the API calls in `src/services/api.js` to match your actual backend endpoints!**

---

## Handling Token/Authentication

If your backend uses JWT tokens, update the API service:

```jsx
const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  };

  // ... rest of the code
};
```

---

## Troubleshooting

**CORS Error?**
- Make sure backend is running on port 3000
- Check vite.config.js proxy settings
- Backend should allow requests from `http://localhost:5173`

**Backend not responding?**
- Verify backend is running: `http://localhost:3000`
- Check network tab in browser DevTools
- Look at backend console for errors

**API endpoint not found?**
- Match endpoints in `api.js` to your actual backend routes
- Check if backend responds to test requests using Postman/curl

