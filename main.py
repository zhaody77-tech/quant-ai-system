from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "Quant AI System Running 🚀"}

@app.get("/backtest/run_pro")
def run_backtest():
    equity = np.cumprod(1 + np.random.randn(100)*0.01).tolist()
    benchmark = np.cumprod(1 + np.random.randn(100)*0.008).tolist()

    return {
        "equity": equity,
        "benchmark": benchmark,
        "performance": {
            "total_return": 0.25,
            "max_drawdown": -0.08,
            "win_rate": 0.65
        }
    }
