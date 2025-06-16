import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MoodForm from './MoodForm';
import MoodHistory from './MoodHistory';
import MoodChart from './MoodChart';

function Dashboard({ username }) {
  const [moodLogs, setMoodLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback to memoize fetchLogs function
  const fetchLogs = useCallback(async () => {
    if (!username) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/logs?username=${username}`);
      setMoodLogs(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort by date descending
    } catch (err) {
      setError(err.response ? err.response.data.detail : 'Error fetching mood logs');
      console.error("Error fetching mood logs:", err);
      setMoodLogs([]); // Clear logs on error
    } finally {
      setIsLoading(false);
    }
  }, [username]); // Dependency: username

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]); // fetchLogs is memoized and only changes if username changes

  const handleLogAdded = (newLog) => {
    console.log('New mood log added in Dashboard:', newLog);
    // Add to the top of the list and re-sort (or assume newLog is the latest)
    setMoodLogs(prevLogs => [newLog, ...prevLogs].sort((a, b) => new Date(b.date) - new Date(a.date)));
    // Potentially, could also trigger a re-fetch if consistency is paramount
    // fetchLogs();
  };

  return (
    <div className="DashboardComponent">
      <h2>Dashboard for {username}</h2>
      <p>Welcome to your mood tracking dashboard. Log your mood below and see your history.</p>

      <MoodForm username={username} onLogAdded={handleLogAdded} />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {isLoading ? (
        <p>Loading mood history...</p>
      ) : (
        <MoodHistory moodLogs={moodLogs} />
      )}

      {/* MoodChart will be developed later and will also receive moodLogs */}
      <MoodChart username={username} moodLogs={moodLogs} />
    </div>
  );
}

export default Dashboard;
