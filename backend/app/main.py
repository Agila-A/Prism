# main.py
import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import StreamingResponse, JSONResponse
import shutil
import uuid
from .stt_provider import transcribe_audio
from .tts_provider import synthesize
from .parser import parse_transcript_to_applicant, make_dataframe_from_dict
from .model import explain_loan, make_applicant_df, load_models
from .utils import save_upload_file, format_response_text

app = FastAPI(title="Loan Voice Assistant API")

# Ensure models loaded at startup
@app.on_event("startup")
def startup_event():
    # if models not present, you can call train_and_save_model() manually
    load_models()

@app.post("/predict_audio")
async def predict_audio(file: UploadFile = File(...)):
    # save uploaded file
    tmp_folder = "tmp_audio"
    os.makedirs(tmp_folder, exist_ok=True)
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(tmp_folder, filename)
    save_upload_file(file, file_path)

    # 1) STT
    try:
        transcript = transcribe_audio(file_path)
    except Exception as e:
        return JSONResponse({"error": "STT failed", "details": str(e)}, status_code=500)

    # 2) Parse fields
    parsed, missing = parse_transcript_to_applicant(transcript)

    # simple flow: if fields missing, return transcript + prompt to user to supply missing fields
    if missing:
        return {"status": "need_more_info", "transcript": transcript, "missing": missing}

    # 3) Build data frame and call model
    applicant_df = make_dataframe_from_dict(parsed)
    result = explain_loan(applicant_df)

    # 4) Format natural response
    text_response = format_response_text(result)

    # 5) TTS create audio file
    out_audio = os.path.join(tmp_folder, f"{uuid.uuid4().hex}.mp3")
    synthesize(text_response, out_audio)

    # 6) Stream back audio file
    def iterfile():
        with open(out_audio, "rb") as f:
            yield from f

    return StreamingResponse(iterfile(), media_type="audio/mpeg")
