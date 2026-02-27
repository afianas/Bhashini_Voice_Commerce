# backend/whisper_service.py

import whisper

# Load once globally (VERY IMPORTANT)
model = whisper.load_model("small")  # use "small" model

def speech_to_text(audio_file_path, language="ml"):
    result = model.transcribe(audio_file_path, language=language)
    return result["text"]