import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './MoodChart.css'; // For styling the container

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define a consistent set of moods and their colors
const MOOD_CONFIG = {
  "Happy": { color: 'rgba(40, 167, 69, 0.7)', borderColor: 'rgba(40, 167, 69, 1)' },
  "Sad": { color: 'rgba(0, 123, 255, 0.7)', borderColor: 'rgba(0, 123, 255, 1)' },
  "Angry": { color: 'rgba(220, 53, 69, 0.7)', borderColor: 'rgba(220, 53, 69, 1)' },
  "Meh": { color: 'rgba(108, 117, 125, 0.7)', borderColor: 'rgba(108, 117, 125, 1)' },
  "Okay": { color: 'rgba(255, 193, 7, 0.7)', borderColor: 'rgba(255, 193, 7, 1)' },
  "Excited": { color: 'rgba(253, 126, 20, 0.7)', borderColor: 'rgba(253, 126, 20, 1)' },
  "Calm": { color: 'rgba(23, 162, 184, 0.7)', borderColor: 'rgba(23, 162, 184, 1)' },
  // Add other moods from your MoodForm options if necessary
};

const ALL_MOOD_LABELS = Object.keys(MOOD_CONFIG);

function MoodChart({ moodLogs }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (moodLogs && moodLogs.length > 0) {
      const moodCounts = ALL_MOOD_LABELS.reduce((acc, mood) => {
        acc[mood] = 0;
        return acc;
      }, {});

      moodLogs.forEach(log => {
        if (moodCounts.hasOwnProperty(log.mood)) {
          moodCounts[log.mood]++;
        }
        // If a log.mood is not in MOOD_CONFIG, it will be ignored for the chart.
        // You could add an "Other" category or ensure all possible moods are in MOOD_CONFIG.
      });

      const dataValues = ALL_MOOD_LABELS.map(mood => moodCounts[mood]);
      const backgroundColors = ALL_MOOD_LABELS.map(mood => MOOD_CONFIG[mood].color);
      const borderColors = ALL_MOOD_LABELS.map(mood => MOOD_CONFIG[mood].borderColor);

      // Filter out moods with zero counts for a cleaner chart, or show all
      // const filteredLabels = [];
      // const filteredDataValues = [];
      // const filteredBackgroundColors = [];
      // const filteredBorderColors = [];

      // ALL_MOOD_LABELS.forEach(mood => {
      //   if (moodCounts[mood] > 0) {
      //     filteredLabels.push(mood);
      //     filteredDataValues.push(moodCounts[mood]);
      //     filteredBackgroundColors.push(MOOD_CONFIG[mood].color);
      //     filteredBorderColors.push(MOOD_CONFIG[mood].borderColor);
      //   }
      // });


      setChartData({
        labels: ALL_MOOD_LABELS, // or filteredLabels
        datasets: [{
          label: 'Mood Count',
          data: dataValues, // or filteredDataValues
          backgroundColor: backgroundColors, // or filteredBackgroundColors
          borderColor: borderColors, // or filteredBorderColors
          borderWidth: 1
        }]
      });
    } else {
      setChartData(null); // Clear chart data if no logs
    }
  }, [moodLogs]); // Re-run when moodLogs change

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Distribution'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Ensure y-axis shows whole numbers for counts
        }
      }
    }
  };

  if (!chartData) {
    return (
      <div className="MoodChartComponent">
        <h3>Mood Chart</h3>
        <p>Not enough data to display chart. Log some moods!</p>
      </div>
    );
  }

  return (
    <div className="MoodChartComponent">
      <h3>Mood Chart</h3>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default MoodChart;
