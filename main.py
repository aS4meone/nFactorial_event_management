from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from app.routers.auth_router import router as auth_router
from app.routers.event_router import router as event_router

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(event_router)


@app.get("/")
def root():
    return dict(message="all works")
