
from fastapi import FastAPI, UploadFile, File, Form
from backend.nlp_engine import parse_inventory_command
from backend.whisper_service import speech_to_text
import os
import shutil
app = FastAPI()
# Replace this with the actual path to your ffmpeg/bin folder
os.environ["PATH"] += os.pathsep + r'C:\ffmpeg\bin'

@app.get("/")
def home():
    return {"status": "Multilingual NLP Backend Running"}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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

from fastapi import UploadFile, File, Form

@app.post("/process-audio")
async def process_audio(
    file: UploadFile = File(...),
    language: str = Form("en")
):

    temp_filename = f"temp_{file.filename}"

    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Whisper ASR
        transcript = speech_to_text(temp_filename,language)

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