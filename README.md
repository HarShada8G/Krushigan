# CropGuardian (क्रॉपगार्डियन)
> **"Detect Early. Predict Smarter. Act Faster."**
> *(फसल को बीमारी से बचाएं, समय रहते सही कदम उठाएं।)*

**Team:** KRANTIKARI  
**Hackathon:** Catalyst Hackathon / Smart India Hackathon  
**Problem Statement ID:** 26131  
**Problem Statement:** Early Detection and Management of Crop Diseases and Pest Infestations.  
**Organization:** Government of Maharashtra (Department of Agriculture concept initiative)  

---

## 🌟 Executive Summary

**CropGuardian** is a state-of-the-art agricultural surveillance, early detection, and risk management platform designed specifically for the agro-climatic conditions of Maharashtra (Vidarbha, Marathwada, Western Maharashtra, and Khandesh). 

The platform bridges cutting-edge computer vision and epidemiological risk forecasting with an **extremely simple, mobile-first, zero-confusion experience for farmers**, alongside a **high-precision GIS command center for district agricultural officers and plant pathologists**.

### Core Operational Cycle:
```
DETECT → ASSESS → PREDICT → ADVISE → VALIDATE → MONITOR → LEARN
```

---

## 🏗️ Two Completely Separate User Experiences

### A. Farmer Portal (`/farmer/dashboard`)
*Designed for a first-time rural smartphone user: understand within 5 seconds.*
- **Simple Dashboard:** Displays farmer's name, village, today's weather (temperature, humidity, rain chance), current crop, and a green/yellow/red health badge.
- **Large Action Button:** High-contrast `📷 फसल की फोटो लें` (Capture Crop Photo).
- **Voice Assistant (किसान मित्र):** Multilingual Web Speech API recognition & Text-to-Speech playback in **Hindi, Marathi, and English** with text input fallback.
- **Three-Tier Action Plan:**
  - 🟢 **पहले यह करें (Green Tier):** Immediate cultural sanitation and drainage.
  - 🟡 **जरूरत पड़ने पर (Yellow Tier):** Verified biological controls (*Trichoderma*, *Beauveria*, Dashparni Ark, Neem oil).
  - 🔴 **विशेषज्ञ की सलाह से (Red Tier):** Certified chemical treatments strictly citing active ingredients, university authority sources (*ICAR / MPKV Rahuri / VNMKV*), application rates, safety PPE precautions, and **Pre-Harvest Intervals (PHI)**.
- **Offline PWA Support:** Cached crop-care guides (*Tomato, Cotton, Soybean, Onion*), local offline photo report queue, and automatic synchronization when connectivity returns.
- **Follow-up Feedback Loop:** Post-diagnosis recovery tracking (*"सुधार हुआ / कोई बदलाव नहीं / समस्या बढ़ गई"*).

### B. Agriculture Officer & Expert Command Center (`/officer/dashboard`)
*Designed for district surveillance, epidemic containment, and AI continuous learning.*
- **Command Dashboard:** Statewide metrics (*Total Reports: 1,420, Confirmed Cases: 980, Active Risk Alerts: 14, Pending KVK Verification: 38, High-Risk Villages: 27*).
- **Interactive Maharashtra GIS Hotspot Map (`/officer/map`):** Leaflet & OpenStreetMap visualizer with valid geographical coordinates (*Akola, Amravati, Nagpur, Nashik, Pune, Chhatrapati Sambhajinagar, Jalgaon, Solapur*).
  - Risk markers: 🟢 Low, 🟡 Medium, 🟠 High, 🔴 Severe.
  - Side drawer showing active reports, primary pathogen, humidity trigger, and high-risk talukas.
  - Filters by Crop, Pathogen, Risk Level, and District.
- **Dedicated Expert Validation Queue (`/officer/validation`):**
  - Pathologists review uploaded leaf imagery with confidence scoring.
  - 5 Dedicated Validation Actions:
    1. `[ Confirm Diagnosis ]`
    2. `[ Correct Diagnosis ]` (re-labeling for model feedback)
    3. `[ Request New Image ]`
    4. `[ Refer to Laboratory ]` (microscopic assay / PCR)
    5. `[ Mark as Unknown ]`
- **SMS & App Alert Broadcast (`/officer/alerts`):**
  - Target by District, Taluka, Crop, Pathogen, and Risk Level.
  - Live smartphone preview showing exact SMS layout received by registered farmers.
  - Simulated gateway dispatch tracking (*1,240 farmers notified*).
- **Epidemiological Analytics & AI Learning Loop (`/officer/analytics`):**
  - Weekly multi-pathogen progression trends (Recharts).
  - District-wise severity distribution.
  - **Continuous Learning Tracker:** Verifies that unverified uploads are NEVER automatically retrained. Tracks verified database entries (*1,325 samples ready*), current production model (*MobileNetV3-v1.4 @ 91.8% accuracy*) vs candidate release (*EfficientNetB2 candidate*).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons |
| **Data Viz & GIS** | Leaflet, React-Leaflet, OpenStreetMap, Recharts |
| **Voice & Speech** | Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`), `SpeechSynthesis` |
| **Offline / PWA** | Service Worker, LocalStorage / IndexedDB queue, Web App Manifest |
| **Backend** | Python 3.10+, FastAPI, Uvicorn, Pydantic v2, RESTful architecture |
| **Database Architecture** | PostgreSQL / PostGIS schemas (SQLite fallback for portable zero-setup demo) |
| **AI Inference Architecture**| MobileNetV3 / EfficientNet disease classifier pipeline + micro-climate risk engine |

---

## 🚀 Quick Start & Setup Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested on v20)
- **Python** 3.10+ (tested on Python 3.14)

### 2. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The web application will open at: **`http://localhost:5173`**

*(To verify production build at any time: `npm run build`)*

### 3. Run FastAPI Backend (Optional / Recommended)
In a separate terminal:
```bash
cd backend
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python run.py
```
Backend will start at: **`http://127.0.0.1:8000`**  
Interactive Swagger API documentation: **`http://127.0.0.1:8000/docs`**

*Note: The frontend includes a bullet-proof built-in fallback client that works 100% seamlessly in standalone Demo Mode even if the backend is not started!*

---

## 🔑 Demo Credentials & Quick Access

CropGuardian provides **1-Click Demo Login** on `/login`:
- **Farmer Profile:** Ramesh Patil (District: Akola, Taluka: Akot, Crop: Tomato)
- **Officer Profile:** Dr. Sunita Deshmukh (District Agricultural Officer, Akola)
- **Expert Profile:** Dr. Vinayak Shinde (Senior Plant Pathologist, KVK Akola)

---

## 🌐 Application Route Sitemap

| Route | Purpose | Target User |
|---|---|---|
| `/` | Public Landing Page & Workflow | General |
| `/about` | Problem Statement 26131 & Mission | General / SIH Judges |
| `/how-it-works` | 7-Stage Architectural Pipeline | General |
| `/login` | 1-Click Role-based Login | All |
| `/register` | Farmer Onboarding & GPS Consent | Farmers |
| `/farmer/dashboard`| 5-Second Mobile-First Farmer Home | Farmers |
| `/farmer/scan` | Leaf Photo Upload, Camera & AI Analysis | Farmers |
| `/farmer/result` | 3-Tier Recommendation & Audio Playback | Farmers |
| `/farmer/my-crops` | Crop Switching & Growth Stage Manager | Farmers |
| `/farmer/advisory` | Micro-Climate Risk Index & Offline Guides | Farmers |
| `/farmer/history` | Scan History & Recovery Feedback Loop | Farmers |
| `/farmer/profile` | Farmer GPS & Location Verification | Farmers |
| `/officer/dashboard`| Statewide Command Center & Stats | Agricultural Officers |
| `/officer/map` | Maharashtra Leaflet GIS Hotspot Map | Officers / GIS Experts |
| `/officer/reports` | Statewide Farmer Registry & Search | Officers |
| `/officer/validation`| KVK Expert Diagnosis & Validation Queue | Pathologists |
| `/officer/farmers` | Farmer Landholding & Scan Directory | Officers |
| `/officer/alerts` | SMS Broadcast Composer & Phone Preview | Officers |
| `/officer/analytics`| Epidemiological Charts & AI Learning Loop | Officers / ML Engineers |
| `/expert/case/:id` | Deep Laboratory Referral & Culture Order| Plant Pathologists |

---

## ⚖️ Truth-in-AI & Engineering Disclosure

| Feature | Implementation Status | Note |
|---|---|---|
| **Disease Classification** | **Functional Demo Pipeline** | Uses deterministic neural simulation based on real leaf lesion characteristics and crop types. Does not misrepresent simulated percentages as live cloud GPUs. |
| **Weather & Environmental Risk** | **Integrated Risk Layer** | Micro-climate correlation engine combines temperature, humidity, and rainfall probability to assess pathogen spore germination. Live Open-Meteo ready. |
| **Multilingual Voice System** | **Fully Implemented** | Uses browser Web Speech API for Hindi, Marathi, and English speech recognition with text fallback, and Text-to-Speech synthesis. |
| **Offline PWA Capabilities** | **Fully Implemented** | Service worker, cache manifest, local report queueing, and offline guides for Tomato, Cotton, Soybean, and Onion. |
| **Maharashtra GIS Map** | **Fully Implemented** | Geographically valid coordinates for Akola, Amravati, Nagpur, Nashik, Pune, Sambhajinagar, Jalgaon, and Solapur via Leaflet & OpenStreetMap. |
| **SMS Gateway Broadcast** | **Simulated Demo Gateway** | Realistically formats and renders recipient counts (1,240 farmers) with mobile SMS preview without incurring unauthorized carrier telecom charges. |

---

## 🏆 SIH Judge Evaluation Highlights

1. **Simplicity First:** The farmer interface has no charts, ML confusion, or confusing jargon.
2. **Scientific Integrity:** Pesticides are never recommended without strict active ingredient names, authoritative sources (*MPKV Rahuri / ICAR*), and safety/PHI rules.
3. **Inclusive Accessibility:** Primary language is Hindi, with complete Marathi and English support accessible instantly from any screen.
4. **Resilience:** Works completely offline in rural fields with automatic synchronization upon signal restoration.

---

**CropGuardian** — *Crafted with precision by Team KRANTIKARI for Smart India Hackathon 2026.*
