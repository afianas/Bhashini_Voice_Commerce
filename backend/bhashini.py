import os
import requests
from dotenv import load_dotenv
import base64

load_dotenv()

API_KEY = os.getenv("BHASHINI_API_KEY")
SERVICE_ID = os.getenv("BHASHINI_SERVICE_ID")
INFERENCE_URL = os.getenv("BHASHINI_INFERENCE_URL")


def speech_to_text(audio_bytes, source_language="hi"):
    encoded_audio = base64.b64encode(audio_bytes).decode("utf-8")

    payload = {
        "pipelineTasks": [
            {
                "taskType": "asr",
                "config": {
                    "language": {
                        "sourceLanguage": source_language
                    },
                    "serviceId": SERVICE_ID
                }
            }
        ],
        "inputData": {
            "audio": [
                {
                    "audioContent": encoded_audio
                }
            ]
        }
    }

    headers = {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY
    }

    response = requests.post(INFERENCE_URL, json=payload, headers=headers)

    if response.status_code != 200:
        return None

    result = response.json()

    try:
        transcript = result["pipelineResponse"][0]["output"][0]["source"]
        return transcript
    except:
        return None