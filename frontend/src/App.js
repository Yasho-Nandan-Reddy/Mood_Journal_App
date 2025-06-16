import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // This will render other components

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('moodAppUser') || null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('moodAppUser', currentUser);
    } else {
      localStorage.removeItem('moodAppUser');
    }
  }, [currentUser]);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div> {/* Removed className="App" as global styles apply to body/root elements */}
        <header className="App-header">
          <h1>Mood Tracker</h1>
          {currentUser && (
            <button onClick={handleLogout}> {/* Removed inline styles, handled by App.css */}
              Logout ({currentUser})
            </button>
          )}
        </header>
        <main className="App-main">
          <Routes>
            <Route
              path="/login"
              element={!currentUser ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={currentUser ? <Dashboard username={currentUser} /> : <Navigate to="/login" />}
            />
            {/* Default redirect to login if no user and not on login page, or to dashboard if user exists */}
            <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
