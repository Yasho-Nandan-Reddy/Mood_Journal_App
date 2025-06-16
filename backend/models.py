from sqlalchemy import Column, Integer, String
from .database import Base

class MoodLog(Base):
    __tablename__ = "mood_logs"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    date = Column(String)  # Using String for simplicity, can be changed to Date/DateTime
    mood = Column(String)
    journal_entry = Column(String, nullable=True)
