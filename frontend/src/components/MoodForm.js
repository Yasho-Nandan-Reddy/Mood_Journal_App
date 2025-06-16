import React, { useState } from 'react';
import axios from 'axios';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function MoodForm({ username, onLogAdded }) {
  const [date, setDate] = useState(getTodayDate());
  const [selectedMood, setSelectedMood] = useState('Happy'); // Default mood
  const [journalEntry, setJournalEntry] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages
  const [isError, setIsError] = useState(false);

  const moodOptions = ["Happy", "Sad", "Angry", "Meh", "Okay", "Excited", "Calm"]; // Added more options

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsError(false);

    if (!username) {
      setMessage('Username is missing. Cannot submit log.');
      setIsError(true);
      return;
    }

    const payload = {
      username: username,
      date: date,
      mood: selectedMood,
      journal_entry: journalEntry,
    };

    try {
      const response = await axios.post('http://localhost:8000/log', payload);
      setMessage('Mood log submitted successfully!');
      setIsError(false);
      // Clear form
      setDate(getTodayDate());
      setSelectedMood('Happy');
      setJournalEntry('');

      if (onLogAdded) {
        onLogAdded(response.data); // Pass the newly added log data
      }
    } catch (error) {
      let errorMessage = 'Failed to submit mood log.';
      if (error.response && error.response.data && error.response.data.detail) {
        if (Array.isArray(error.response.data.detail)) {
            errorMessage = error.response.data.detail.map(err => `${err.loc[1]}: ${err.msg}`).join(', ');
        } else {
            errorMessage = error.response.data.detail;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check if the backend is running.';
      }
      setMessage(errorMessage);
      setIsError(true);
      console.error("Error submitting mood log:", error);
    }
  };

  return (
    <div className="MoodFormComponent">
      <h3>Log Your Mood</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-message-area" style={{ minHeight: '25px', marginBottom: '10px' }}>
          {message && (
            <p style={{ color: isError ? 'red' : 'green', margin: '0' }}>
              {message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mood">Mood:</label>
          <select
            id="mood"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            required
          >
            {moodOptions.map(mood => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="journalEntry">Journal Entry (Optional):</label>
          <textarea
            id="journalEntry"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            rows="4"
          />
        </div>
        <button type="submit">Submit Log</button>
      </form>
    </div>
  );
}

export default MoodForm;
