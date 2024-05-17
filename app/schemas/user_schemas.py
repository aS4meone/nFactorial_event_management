from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    role: str


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str = "alnurqa"
    password: str


class UserDefault(UserBase):
    id: int

    class Config:
        from_attributes = True
