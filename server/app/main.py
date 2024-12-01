from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils import process_url
from utils import predict
from pydantic import BaseModel
from typing import List
app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class URLList(BaseModel):
    urls: List[str]


class Query(BaseModel):
    q: str



@app.post("/api/process_url")
async def get_data(urls: URLList):
    print(urls)
    process_url(urls=urls.urls)
    return {"message": "success"}


@app.post("/api/predict")
async def predict_data(q:Query):
    data = predict(q.q)
    return data
