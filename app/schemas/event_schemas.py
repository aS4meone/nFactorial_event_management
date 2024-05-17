from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from app.schemas.user_schemas import UserDefault


class EventCreate(BaseModel):
    name: str
    location: str
    time: datetime
    description: str
    tickets: int


class EventList(BaseModel):
    id: int
    name: str
    location: str
    time: datetime

    class Config:
        orm_mode = True


class EventBase(BaseModel):
    id: int
    name: str
    location: str
    time: datetime
    description: str
    tickets: int
    image_url: Optional[str] = None

    class Config:
        orm_mode = True


class EventDetail(EventBase):
    users: list[UserDefault]
