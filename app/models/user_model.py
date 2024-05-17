from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.dependencies.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)

    events = relationship("Event", secondary="user_event", back_populates="users")
