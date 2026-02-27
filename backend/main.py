
from fastapi import FastAPI, UploadFile, File
from backend.nlp_engine import parse_inventory_command
from backend.whisper_service import speech_to_text
import os
import shutil
app = FastAPI()

@app.get("/")
def home():
    return {"status": "Multilingual NLP Backend Running"}

from pydantic import BaseModel

class CommandRequest(BaseModel):
    command: str

@app.post("/parse")
def parse_text(request: CommandRequest):
    result = parse_inventory_command(request.command)
    return {
        "input": request.command,
        "parsed": result
    }

@app.post("/process-audio")
async def process_audio(file: UploadFile = File(...)):

    temp_filename = f"temp_{file.filename}"

    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Whisper ASR
        transcript = speech_to_text(temp_filename, language="ml")

        # Your NLP layer
        parsed_data = parse_inventory_command(transcript)

        return {
            "transcript": transcript,
            "parsed": parsed_data
        }

    except Exception as e:
        return {"error": str(e)}

    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)