# backend/ai/voice/text_to_speech.py
"""
Text-to-speech using pyttsx3 for offline use.
For production, use Polly/GoogleTTS/ElevenLabs via secure API.
This function writes a WAV file at out_path.
"""
import pyttsx3
import time
from pathlib import Path
import logging

logger = logging.getLogger("text_to_speech")
_engine = None

def _get_engine():
    global _engine
    if _engine is None:
        _engine = pyttsx3.init()
        # tune voice/rate here or via env vars
        try:
            _engine.setProperty("rate", 150)
        except Exception:
            pass
    return _engine

def text_to_speech(text: str, out_path: str):
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)

    engine = _get_engine()
    # pyttsx3 supports save_to_file
    engine.save_to_file(text, str(out))
    engine.runAndWait()
    # small sleep to ensure file flush
    time.sleep(0.05)
    logger.info("TTS saved to %s", out)
