from fastapi import APIRouter
from pydantic import BaseModel
from llm_service import ask_prism_llm, ask_prism_followup

router = APIRouter()

# ---------------------------
# Pydantic Models
# ---------------------------
class AskAIRequest(BaseModel):
    result: dict
    user_language: str = "en"

class FollowupRequest(BaseModel):
    payload: dict
    user_question: str

# ---------------------------
# Endpoint 1 — Initial AI Explanation
# ---------------------------
@router.post("/ask-ai")
def ask_ai(req: AskAIRequest):
    payload = {
        "decision": req.result["decision"],
        "probability": req.result["probability"],
        "shap_reasons": req.result["explanation"],
        "user_language": req.user_language
    }

    answer = ask_prism_llm(payload)
    return {"response": answer}

# ---------------------------
# Endpoint 2 — Follow-up Chat
# ---------------------------
@router.post("/ask-ai-followup")
def ask_ai_followup(req: FollowupRequest):
    answer = ask_prism_followup(req.payload, req.user_question)
    return {"response": answer}
