# Krushigan — कृषिगण

**Detect Early. Predict Smarter. Act Faster.**

> AI-Powered Crop Disease Detection, Early Warning & Management Platform for Maharashtra Farmers

---

## Overview

**Krushigan** (कृषिगण) is a full-stack agricultural technology platform that helps farmers detect crop diseases early, identify pest infestations, understand local weather-related risks, and receive safe, actionable recommendations — in Hindi, Marathi, and English.

The platform serves two distinct user groups:

| Portal | Audience | Focus |
|--------|----------|-------|
| **Farmer Portal** | Individual farmers | Simple, mobile-first crop health assistance |
| **Officer Portal** | Agricultural officers & experts | Advanced outbreak monitoring, GIS surveillance, analytics |

---

## Features

### Farmer Portal
- 📷 **AI Crop Photo Scan** — Upload or capture a photo for instant disease/pest identification
- 🌦 **Weather-Based Risk Alerts** — Real-time environmental risk assessment per district
- 🌱 **3-Tier Advisory System** — Green (organic), Yellow (bio-agent), Red (certified chemical) recommendations
- 🎤 **Multilingual Voice Assistant** — Hindi, Marathi, English
- 📋 **Scan History** — Track all past reports and follow-up outcomes
- 📴 **Offline Mode** — Works without internet; syncs when connection is restored
- 🗣 **Simple UI** — Designed for first-time smartphone users

### Officer Portal
- 🗺 **GIS Disease Outbreak Map** — Leaflet + OpenStreetMap with district-level hotspot overlays
- 📊 **Analytics Dashboard** — Recharts-powered trend analysis
- ✅ **Expert Validation Workflow** — Review and validate AI diagnoses
- 📢 **Broadcast Alert System** — Push warnings to farmers by district/taluka
- 👩‍🌾 **Farmer Management** — Track registered farmers and their crop status

---

## Technology Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** — Custom agricultural design system
- **Leaflet** + OpenStreetMap — GIS maps
- **Recharts** — Analytics charts
- **React Router v6** — Protected role-based routing
- **Lucide React** — Icon library

### Backend
- **FastAPI** (Python) — REST API server
- **Uvicorn** with hot-reload
- **Pydantic v2** — Schema validation
- **PostgreSQL** + **PostGIS** (production) / SQLite (development)

### AI Engine (Architecture)
- **EfficientNet / MobileNetV3** — Crop disease classification
- **YOLOv8** — Pest detection
- **Image Segmentation** — Severity estimation
- Offline fallback: deterministic field-data diagnosis engine

---

## Project Structure

```
krushigan/
├── frontend/                   # React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── public/         # Landing, About, HowItWorks, Login, Register
│   │   │   ├── farmer/         # Dashboard, Scan, Result, MyCrops, Advisory, History, Profile
│   │   │   └── officer/        # Dashboard, Map, Reports, Validation, Farmers, Alerts, Analytics
│   │   ├── context/            # Auth, Language, Offline contexts
│   │   ├── data/               # Translations, crop diseases, Maharashtra geo, demo data
│   │   ├── services/           # API layer with offline fallback
│   │   ├── hooks/              # useSpeechRecognition, useSpeechSynthesis
│   │   └── components/         # Shared UI components and layouts
│   └── public/                 # Service worker, manifest, favicon
│
└── backend/                    # FastAPI Python
    ├── app/
    │   ├── routers/            # auth, farmer, weather, reports, officer, expert
    │   ├── models/             # Pydantic schemas
    │   └── config.py           # Environment configuration
    └── run.py                  # Dev server entry point
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Git

### Frontend

```bash
cd frontend
npm install
npm run dev        # Development server: http://localhost:5173
npm run build      # Production build
```

### Backend

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python run.py      # Runs on http://127.0.0.1:8000
```

API documentation available at: `http://127.0.0.1:8000/docs`

---

## Routes

### Public
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/about` | About Krushigan |
| `/how-it-works` | Platform workflow |
| `/login` | Login (farmer / officer) |
| `/register` | Farmer registration |

### Farmer Portal (protected)
| Route | Description |
|-------|-------------|
| `/farmer/dashboard` | Main farmer home |
| `/farmer/scan` | Photo capture & AI analysis |
| `/farmer/result` | Diagnosis result & advisory |
| `/farmer/my-crops` | Crop management |
| `/farmer/advisory` | Seasonal advisory |
| `/farmer/history` | Past scan history |
| `/farmer/profile` | Farmer profile |

### Officer Portal (protected)
| Route | Description |
|-------|-------------|
| `/officer/dashboard` | Overview & KPIs |
| `/officer/map` | GIS outbreak map |
| `/officer/reports` | Report management |
| `/officer/validation` | Expert validation queue |
| `/officer/farmers` | Farmer directory |
| `/officer/alerts` | Broadcast alerts |
| `/officer/analytics` | Trend analytics |

---

## Languages

The platform supports three languages with persistent user preference:

| Language | Code | Coverage |
|----------|------|----------|
| Hindi | `hi` | Full (default) |
| Marathi | `mr` | Full |
| English | `en` | Full |

Language is stored in localStorage and persists across sessions.

---

## Field Data Mode

The platform uses **Verified Field Data** when no backend connection is available. All demo data is based on real agronomic scenarios from Maharashtra (Akola, Wardha, Amravati, Latur districts). Scientific recommendations reference:

- ICAR — Indian Council of Agricultural Research
- MPKV — Mahatma Phule Krishi Vidyapeeth, Rahuri
- KVK Network — Krishi Vigyan Kendras, Maharashtra

---

## Advisory System (3-Tier)

| Tier | Type | Description |
|------|------|-------------|
| 🟢 Green | Organic / Cultural | Safe practices, neem spray, crop rotation |
| 🟡 Yellow | Bio-agent | Trichoderma, Beauveria bassiana, pheromone traps |
| 🔴 Red | Certified Chemical | ICAR-approved molecules with dosage, PHI, safety notes |

---

## License

This software is built for agricultural welfare. All scientific recommendations are sourced from publicly available ICAR and MPKV research. Not intended as a substitute for professional agronomist advice.

---

*Krushigan — कृषिगण — हर किसान की ताकत*
