# Mood Tracker Web Application

## Overview

This is a full-stack web application that allows users to log their daily mood and a short journal entry. It displays a history of their mood logs and a visual mood chart.

## Features

*   **User Authentication:** Simple username-based login (no passwords).
*   **Mood Logging:** Select date, mood (e.g., Happy, Sad, Angry, Meh, Okay, Excited, Calm), and add an optional journal entry.
*   **Mood History:** View a chronological list of all past mood entries for the logged-in user.
*   **Mood Chart:** See a bar chart representing the distribution of logged moods over time.

## Tech Stack

*   **Frontend:** React.js, Axios, Chart.js, react-chartjs-2
*   **Backend:** FastAPI (Python), SQLAlchemy, SQLite
*   **Routing:** React Router DOM

## Prerequisites

*   Node.js and npm (for frontend) - Latest LTS version recommended.
*   Python 3.8+ and pip (for backend).

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### Frontend Setup

1.  **Navigate to the frontend directory (from the project root):**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the Backend Server:**
    *   Ensure you are in the `backend` directory and your virtual environment is activated.
    *   Run the FastAPI application:
        ```bash
        uvicorn main:app --reload
        ```
    *   The backend will typically be available at `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    *   Navigate to the `frontend` directory (if not already there).
    *   Run the React application:
        ```bash
        npm start
        ```
    *   The frontend will typically open automatically in your browser at `http://localhost:3000`.

Once both servers are running, you can access the application by navigating to `http://localhost:3000` in your web browser.
