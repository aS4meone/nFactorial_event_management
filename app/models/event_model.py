from sqlalchemy import Column, ForeignKey, Integer, String, Table, DateTime
from sqlalchemy.orm import relationship

from app.dependencies.database.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    time = Column(DateTime)
    description = Column(String)
    tickets = Column(Integer)
    image_url = Column(String)

    users = relationship("User", secondary="user_event", back_populates="events")


user_event = Table(
    "user_event",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("event_id", ForeignKey("events.id"), primary_key=True),
)
