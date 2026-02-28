import subprocess

try:
    # Try to run ffmpeg version command
    result = subprocess.run(["ffmpeg", "-version"], capture_output=True, text=True)
    print("SUCCESS: FFmpeg is working!")
    print(result.stdout.splitlines()[0])
except FileNotFoundError:
    print("ERROR: Python still cannot find FFmpeg.")