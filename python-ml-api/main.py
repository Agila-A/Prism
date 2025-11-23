from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from loan_model import explain_loan  # import your function

app = FastAPI()

class Applicant(BaseModel):
    age: int
    salary: float
    credit_score: int
    existing_emi: float
    loan_amount: float
    default_history: int

@app.post("/predict")
def predict_loan(applicant: Applicant):

    data = pd.DataFrame([applicant.dict()])

    result = explain_loan(data)

    return {
        "decision": result["decision"],
        "probability": result["probability"],
        "explanation": result["explanation"]
    }
