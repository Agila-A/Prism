# tts_provider.py
import os
import tempfile

def tts_with_pyttsx3(text: str, out_path: str):
    import pyttsx3
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.save_to_file(text, out_path)
    engine.runAndWait()
    return out_path

def tts_with_gtts(text: str, out_path: str):
    from gtts import gTTS
    tts = gTTS(text=text, lang='en')
    tts.save(out_path)
    return out_path

def synthesize(text: str, out_path: str):
    provider = os.getenv("TTS_PROVIDER", "gtts").lower()
    if provider == "pyttsx3":
        return tts_with_pyttsx3(text, out_path)
    else:
        return tts_with_gtts(text, out_path)
