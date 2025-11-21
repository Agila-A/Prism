# backend/ai/ai_server.py
"""
AI microservice entrypoint. FastAPI service exposing STT, intent, and TTS endpoints.
Node backend calls these endpoints via HTTP.
"""
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uuid
import shutil
import os
import logging

# Import local AI modules
from voice.speech_to_text import transcribe_audio_file
from nlp.inference import predict_intent_from_text
from voice.text_to_speech import text_to_speech
from voice.wake_word import contains_wake_word

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = BASE_DIR / "output_audio"
UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="PRISM AI Engine", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("ai_server")
logging.basicConfig(level=logging.INFO)


@app.post("/stt")
async def stt(file: UploadFile = File(...)):
    """
    Accept audio file and return transcription (raw text).
    """
    try:
        ext = Path(file.filename).suffix or ".wav"
        inpath = UPLOAD_DIR / f"{uuid.uuid4().hex}{ext}"
        with open(inpath, "wb") as f:
            shutil.copyfileobj(file.file, f)

        text = transcribe_audio_file(str(inpath))
        return {"success": True, "text": text}
    except Exception as e:
        logger.exception("STT error")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/intent")
async def intent(payload: dict):
    """
    Accept JSON { "text": "<user text>" } and return intent + entities
    """
    text = payload.get("text")
    if not text:
        raise HTTPException(status_code=400, detail="Missing 'text' in payload")

    intent, entities = predict_intent_from_text(text)
    return {"success": True, "intent": intent, "entities": entities}


@app.post("/predict_audio")
async def predict_audio(file: UploadFile = File(...)):
    """
    Full pipeline: audio -> STT -> intent -> decision_text -> TTS -> audio_url
    Node backend can call /predict_audio for a single-call flow.
    """
    try:
        ext = Path(file.filename).suffix or ".wav"
        inpath = UPLOAD_DIR / f"{uuid.uuid4().hex}{ext}"
        with open(inpath, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # STT
        text = transcribe_audio_file(str(inpath))
        logger.info("Transcribed text: %s", text)

        # Optional wake-word check (simple)
        if contains_wake_word(text):
            # remove wake word for intent detection
            cleaned = text.lower().replace("prism", "").strip()
        else:
            cleaned = text

        # Intent
        intent, entities = predict_intent_from_text(cleaned)
        logger.info("Predicted intent: %s entities: %s", intent, entities)

        # Decision text placeholder - Node backend should call decision engine.
        # We return the parsed intent/entities so Node can make secure decisions.
        # But provide a short assistant reply for prototype flows:
        response_text = f"I detected intent '{intent}'. Entities: {entities}."

        # TTS
        out_filename = f"response_{uuid.uuid4().hex}.wav"
        out_path = OUTPUT_DIR / out_filename
        text_to_speech(response_text, str(out_path))

        return {
            "success": True,
            "transcript": text,
            "intent": intent,
            "entities": entities,
            "response_text": response_text,
            "audio_url": f"/audio/{out_filename}"
        }
    except Exception as e:
        logger.exception("predict_audio error")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/audio/{fname}")
async def fetch_audio(fname: str):
    p = OUTPUT_DIR / fname
    if not p.exists():
        raise HTTPException(status_code=404, detail="file not found")
    return FileResponse(path=str(p), media_type="audio/wav")

@app.get("/")
async def root():
    return {"status": "AI Server is running 🚀"}
