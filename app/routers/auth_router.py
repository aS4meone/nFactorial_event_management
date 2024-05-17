from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security.tokens import create_access_token
from app.dependencies.current_user import get_current_user
from app.dependencies.database.database import get_db
from app.models.user_model import User
from app.schemas.user_schemas import UserCreate, UserLogin, UserDefault

router = APIRouter(tags=["Auth"], prefix='/auth')


@router.post("/register/", response_model=UserDefault)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User with this username already exists")
    db_user = User(username=user.username, password=user.password, role="user")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me/", response_model=UserDefault)
async def read_me(current_user: User = Depends(get_current_user)):
    return current_user
