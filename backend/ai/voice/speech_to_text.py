# backend/ai/voice/speech_to_text.py
"""
Speech-to-text wrapper. Uses OpenAI Whisper if installed and available.
Fallback to a lightweight rule-based placeholder if Whisper is not available.
You can replace this with Google/Azure STT for production (better latency/scale).
"""
import os
import logging
from pathlib import Path

logger = logging.getLogger("speech_to_text")

# Try to import whisper; if not available, provide fallback
try:
    import whisper
    _WHISPER_AVAILABLE = True
except Exception:
    whisper = None
    _WHISPER_AVAILABLE = False

# Choose model name (tiny -> faster, small/medium -> more accurate)
WHISPER_MODEL = os.environ.get("WHISPER_MODEL", "small")  # set env var to change

_model = None

def _load_whisper():
    global _model
    if _model is None and _WHISPER_AVAILABLE:
        logger.info("Loading Whisper model: %s", WHISPER_MODEL)
        _model = whisper.load_model(WHISPER_MODEL)
    return _model

def transcribe_audio_file(filepath: str) -> str:
    """
    Return the transcription of the audio file as plain text.
    """
    if _WHISPER_AVAILABLE:
        model = _load_whisper()
        res = model.transcribe(filepath)
        text = res.get("text", "").strip()
        logger.info("Whisper transcription length=%d", len(text))
        return text
    else:
        # Fallback: very naive placeholder (for dev only)
        logger.warning("Whisper not available - using fallback stub transcription")
        # In fallback we'll attempt to get filename hints or return empty.
        return ""
