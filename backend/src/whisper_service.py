import os
import sys
import subprocess

# --- MANDATORY FFMPEG FIX ---
ffmpeg_path = r'C:\ffmpeg\bin'
os.environ["PATH"] += os.pathsep + ffmpeg_path

# Verify for the console
try:
    subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    print("✅ Whisper Service: FFmpeg found and linked.")
except Exception:
    print("❌ Whisper Service: FFmpeg still not found at C:\\ffmpeg\\bin")
# ----------------------------

import whisper
model = whisper.load_model("small")

def speech_to_text(file_path, language="en"):
    result = model.transcribe(file_path, language=language)
    return result["text"]