# stt_provider.py
import os
import subprocess
import tempfile
from typing import Tuple

# Option A: OpenAI Whisper HTTP API (requires OPENAI_API_KEY)
def stt_with_openai_whisper(filepath: str, openai_api_key: str) -> str:
    # This uses the OpenAI whisper API via requests to upload file.
    # You must `pip install openai` and set env OPENAI_API_KEY
    import openai
    openai.api_key = 
    with open(filepath, "rb") as f:
        resp = openai.Audio.transcribe("gpt-4o-transcribe", f)  # example - adjust per latest API
    # resp may contain 'text' or 'transcript' depending on SDK; adapt as needed
    return resp.get("text") or resp.get("transcript") or ""

# Option B: VOSK local STT (offline)
def stt_with_vosk(filepath: str, model_path="model"):
    # pip install vosk
    from vosk import Model, KaldiRecognizer
    import wave, json
    wf = wave.open(filepath, "rb")
    model = Model(model_path)
    rec = KaldiRecognizer(model, wf.getframerate())
    result_text = []
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            r = json.loads(rec.Result())
            result_text.append(r.get("text", ""))
    r = json.loads(rec.FinalResult())
    result_text.append(r.get("text", ""))
    return " ".join(result_text).strip()

# Option C: faster-whisper (local)
def stt_with_faster_whisper(filepath: str, device="cpu"):
    # pip install faster-whisper
    from faster_whisper import WhisperModel
    model = WhisperModel("large-v2", device=device)  # choose model you installed
    segments, info = model.transcribe(filepath)
    text = " ".join([s.text for s in segments])
    return text

# Helper: choose provider via environment variable
def transcribe_audio(filepath: str) -> str:
    provider = os.getenv("STT_PROVIDER", "whisper_api").lower()
    if provider == "whisper_api":
        key = os.getenv("OPENAI_API_KEY", "")
        return stt_with_openai_whisper(filepath, key)
    elif provider == "vosk":
        return stt_with_vosk(filepath, os.getenv("VOSK_MODEL_PATH", "model"))
    elif provider == "faster-whisper":
        return stt_with_faster_whisper(filepath, device=os.getenv("WHISPER_DEVICE", "cpu"))
    else:
        raise ValueError("Unknown STT_PROVIDER: " + provider)
