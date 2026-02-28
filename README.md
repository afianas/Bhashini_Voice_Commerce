
# 📦 Invora

### Voice-Powered Multilingual Inventory Intelligence for MSMEs

---

## 🚀 Project Description

**Invora** is a multilingual, voice-first mobile inventory management system built for small suppliers, shopkeepers, and warehouse operators.

Traditional inventory apps assume:

* English literacy
* Keyboard input
* Desk-based usage

Invora is different.

It enables suppliers to manage stock using **natural voice commands in Malayalam, Hindi, or English**, powered by AI-driven speech recognition and smart NLP parsing.

> “Inventory management built for the warehouse floor — not the office desk.”

---

# 🧠 Problem Statement

Small and rural businesses struggle with:

* Language barriers
* Complex ERP software
* Slow manual entry
* No revenue visibility

Invora solves this by combining:

* 🎙 Voice input
* 🌍 Multilingual support
* 📊 ABC revenue analysis
* 🤖 AI-powered smart parsing

---

# 🛠 Tech Stack

### 📱 Frontend (Mobile App)

* React Native (Expo)
* Expo Audio
* Fetch API
* State management (React Hooks)

### 🧠 Backend

* FastAPI
* Whisper ASR (Speech-to-Text)
* Smart Rule-Based NLP
* Python

### ☁ Deployment

APK Rendering

---

# ✨ Features

## 1️⃣ The “Bolo” Interface (Voice-First Entry)

🎙 Large microphone button
User speaks in Malayalam / Hindi / English
No typing required

Technology:

* Speech-to-text via ASR
* Language-controlled transcription

User Value:

* Faster than manual entry
* Works for semi-literate suppliers
* Hands-free usage

---

## 2️⃣ Smart NLP Layer (Entity Extraction)

Invora extracts:

* Product
* Quantity
* Unit
* Action (Add / Remove)

Example:

> “50 kilo panchasara cherkuka”

Automatically becomes:

```json
{
  "action": "ADD",
  "product": "Sugar",
  "quantity": 50,
  "unit": "kg"
}
```



---

## 3️⃣ Verification & Transparency

To prevent AI mistakes:

* Raw transcript is shown
* Editable fields
* Manual override option

This builds trust.

---

## 4️⃣ Core Inventory Management

Tracks:

* Product Name
* Stock Level
* Unit
* Selling Price (SP)

Single-warehouse optimized
Flat structure for speed

---

## 5️⃣ ABC Analysis (Revenue Intelligence)

Automatically classifies:

| Category      | Meaning                        |
| ------------- | ------------------------------ |
| 🥇 A (Gold)   | Top 20% generating 80% revenue |
| 🥈 B (Silver) | Moderate value                 |
| 🥉 C (Bronze) | Low value                      |

Category A, B, C items are highlighted in dashboard.

---

## 6️⃣ Financial & AI Insights

* Real-time revenue tracking

---

# 🌍 Multilingual Usage Instructions

## 🇬🇧 English Commands

### ➕ Add Stock

* “Add 5 kg sugar”
* “Add 10 litres milk”


### ➖ Remove / Sell Stock

* “Remove 3 kg rice”

---

## 🇮🇳 Hindi Commands

### ➕ Add

* “5 kilo chini jodo”

### ➖ Remove

* “5 kilo chawal nikaal do”
* “2 packet namak hatao”

---

## 🇮🇳 Malayalam Commands

### ➕ Add

* “5 kilo panchasara cherkuka”
* “10 litre paal cherku”
* “20 packet biscuit cherkuka”

### ➖ Remove

* “5 kilo ari vittu”
* “3 litre enna neekkuka”
* “2 packet uppu eduthu kalayu”

---

# 📲 Installation & Build Guide

## 🔧 Clone Repository

```bash
git clone <https://github.com/afianas/Invora_Voice_Commerce.git>
cd invora
```

---

## 🐍 Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## 📱 Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Scan QR using Expo Go.

---

# 📦 Build APK (Production)

Install EAS CLI:

```bash
npm install -g eas-cli
eas login
```

Configure build:

```bash
eas build:configure
```

Build APK:

```bash
eas build -p android --profile preview
```

Download APK from Expo dashboard.

---

# 📥 Install APK on Android

1. Download APK
2. Enable “Install from Unknown Sources”
3. Install
4. Open Invora

---

# 🗂 Folder Structure

```
invora/
 ├── backend/
 │   ├── main.py
 │   ├── whisper_service.py
 │   ├── nlp_engine.py
 │   ├── gemini_service.py
 │   └── requirements.txt
 │
 ├── frontend/
 │   ├── src/
 │   ├── assets/
 │   ├── App.js
 │   └── package.json
 │
 ├── docs/
 │   ├── architecture.png
 │   └── app-flow.png
 │
 └── README.md
```

---

# 🧭 App Flow Diagram

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/269840ac-90e8-46ea-8a68-0f74a86e19fe" />


---

# 🏗 Architecture Diagram


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/3913e15c-8071-448d-afcb-7812fb684275" />


# 🎥 Demo Video

(Insert Drive / YouTube link here)

---

# 📸 Screenshots

<img width="716" height="1600" alt="image" src="https://github.com/user-attachments/assets/db9c6485-5897-465a-85dd-a28cd1fcd68a" />
<img width="716" height="1600" alt="image" src="https://github.com/user-attachments/assets/645cab12-9533-414c-ae22-7fbdfa938cb3" />
<img width="716" height="1600" alt="image" src="https://github.com/user-attachments/assets/6dc23811-cf96-4be1-939d-ccbe75b8cd3a" />


# 👥 Team Members

* Afia Nasumudeen – NLP & Backend
* Akshara C A - Frontend 

---

# 🤖 AI Tools Used

* Whisper (Speech Recognition)
* Prompt Engineering for structured output
* ChatGPT for development support

---

# 📜 License

MIT License



# ❤️ Built For

Small businesses.
Warehouse floors.
Regional language users.

Made with ❤️ for inclusive commerce.


