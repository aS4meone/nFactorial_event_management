import os
from urllib.parse import urlencode
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.dependencies.current_user import get_current_user
from app.dependencies.database.database import get_db
from app.models.user_model import User
from app.models.event_model import Event
from app.schemas.event_schemas import EventCreate, EventDetail, EventList
from app.schemas.user_schemas import UserDefault

router = APIRouter(tags=["Events"], prefix='/events')


def create_upload_directory(directory_path):
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)


@router.post("/{event_id}/upload_photo", response_model=EventDetail)
def upload_event_photo(event_id: int, image: UploadFile = File(...), db: Session = Depends(get_db)):
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Only image files are allowed")

    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    create_upload_directory("uploads")

    with open(f"uploads/{image.filename}", "wb") as buffer:
        buffer.write(image.file.read())

    event.image_url = f"http://195.49.210.50:8080/uploads/{image.filename}"
    db.commit()

    return event


@router.post("/", response_model=EventDetail)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@router.get("/", response_model=list[EventList])
def get_all_events(db: Session = Depends(get_db)):
    return db.query(Event).all()


@router.get("/{event_id}", response_model=EventDetail)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/register/{event_id}/", response_model=EventDetail)
def register_to_event(event_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.tickets <= 0:
        raise HTTPException(status_code=400, detail="No available tickets for this event")

    if current_user in event.users:
        raise HTTPException(status_code=400, detail="User already registered for this event")

    event.tickets -= 1
    event.users.append(current_user)
    db.commit()
    db.refresh(event)
    return event


@router.get("/my_events/", response_model=list[EventList])
def get_user_events(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return current_user.events


@router.get("/my_events/count")
def get_user_events_count(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return len(current_user.events)


@router.get("/registered_users/{event_id}/", response_model=list[UserDefault])
def get_registered_users(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event.users


@router.get("/{event_id}/calendar_link")
def generate_google_calendar_link(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    base_url = "https://www.google.com/calendar/render"

    start_time = event.time.strftime('%Y%m%dT%H%M%SZ')

    query_params = {
        "action": "TEMPLATE",
        "text": event.name,
        "dates": f"{start_time}/{start_time}",
        "details": event.description,
        "location": event.location
    }
    link = f"{base_url}?{urlencode(query_params)}"

    return {"calendar_link": link}
