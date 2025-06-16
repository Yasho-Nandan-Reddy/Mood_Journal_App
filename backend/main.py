from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict

from .database import init_db, SessionLocal, engine # engine might not be directly used here but good to have if needed
from . import models
from . import schemas

# Initialize database on startup
# models.Base.metadata.create_all(bind=engine) # This is handled by init_db now

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if your React app runs on a different port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    init_db() # Creates tables

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/log", response_model=schemas.MoodLogResponse)
def create_mood_log(mood_log: schemas.MoodLogCreate, db: Session = Depends(get_db)):
    db_mood_log = models.MoodLog(**mood_log.dict())
    db.add(db_mood_log)
    db.commit()
    db.refresh(db_mood_log)
    return db_mood_log

@app.get("/logs", response_model=List[schemas.MoodLogResponse])
def get_mood_logs(username: str, db: Session = Depends(get_db)):
    logs = db.query(models.MoodLog).filter(models.MoodLog.username == username).all()
    if not logs:
        # Return empty list instead of 404 if no logs for a user is not an error
        return []
    return logs

@app.get("/logs/chart", response_model=schemas.ChartData)
def get_chart_data(username: str, db: Session = Depends(get_db)):
    logs = db.query(models.MoodLog).filter(models.MoodLog.username == username).all()
    if not logs:
        # Return empty counts if no logs for a user
        return schemas.ChartData(mood_counts={})

    mood_counts: Dict[str, int] = {}
    for log in logs:
        mood_counts[log.mood] = mood_counts.get(log.mood, 0) + 1

    return schemas.ChartData(mood_counts=mood_counts)

@app.get("/")
async def root():
    return {"message": "Mood App Backend is running"}
