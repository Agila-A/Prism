# utils.py
import os
import time
from pathlib import Path

def save_upload_file(upload_file, dst: str):
    with open(dst, "wb") as buffer:
        buffer.write(upload_file.file.read())
    return dst

def format_response_text(result: dict):
    # result: {"decision":..., "probability":..., "explanation":[...]}
    decision = result.get("decision")
    prob = int(round(result.get("probability", 0) * 100))
    explanations = result.get("explanation", [])
    expl_text = " ".join(explanations[:3])
    return f"Decision: {decision}. Approval probability {prob} percent. {expl_text}"
