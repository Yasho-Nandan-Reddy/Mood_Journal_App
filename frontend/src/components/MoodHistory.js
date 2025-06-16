import React from 'react';
import './MoodHistory.css'; // We'll create this file for styling

function MoodHistory({ moodLogs }) {
  if (!moodLogs || moodLogs.length === 0) {
    return <div className="MoodHistoryComponent"><p>No mood entries yet. Start logging!</p></div>;
  }

  // Sort by date, most recent first (assuming Dashboard doesn't always pre-sort or if direct manipulation occurs)
  // const sortedLogs = [...moodLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  // Dashboard now handles sorting, so sortedLogs might be redundant if moodLogs is always sorted.
  // For safety, if direct manipulation of moodLogs prop could happen unsorted, keep it.
  // However, if Dashboard guarantees sorted prop, this is unnecessary.
  // Given current Dashboard implementation, moodLogs prop IS sorted.

  return (
    <div className="MoodHistoryComponent">
      <h3>Your Mood History</h3>
      {moodLogs.length === 0 ? (
        <p>No mood entries yet.</p>
      ) : (
        <ul className="mood-log-list">
          {moodLogs.map(log => (
            <li key={log.id} className="mood-log-item">
              <div className="log-date">{new Date(log.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div className="log-mood">Mood: <span className={`mood-tag mood-${log.mood.toLowerCase()}`}>{log.mood}</span></div>
              {log.journal_entry && (
                <div className="log-journal">
                  <strong>Journal:</strong>
                  <p>{log.journal_entry}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoodHistory;
