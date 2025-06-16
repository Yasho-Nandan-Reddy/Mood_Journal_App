from pydantic import BaseModel
from typing import Optional, List, Dict

class MoodLogBase(BaseModel):
    username: str
    date: str # Using String for simplicity
    mood: str
    journal_entry: Optional[str] = None

class MoodLogCreate(MoodLogBase):
    pass

class MoodLogResponse(MoodLogBase):
    id: int

    class Config:
        orm_mode = True # Changed from from_attributes = True for Pydantic v1 compatibility if needed

class ChartData(BaseModel):
    mood_counts: Dict[str, int]
