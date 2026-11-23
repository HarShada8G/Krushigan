from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
import httpx
from app.config import GEMINI_API_KEY, GEMINI_MODEL

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])

class AIChatRequest(BaseModel):
    message: str
    language: Optional[str] = "hi"
    crop: Optional[str] = None
    district: Optional[str] = None
    growth_stage: Optional[str] = None

class AIChatResponse(BaseModel):
    answer: str
    language: str
    isRealAI: bool
    isOfflineDemo: bool
    modelUsed: str
    disclaimer: Optional[str] = None

# Comprehensive offline domain knowledge repository for Indian agriculture
OFFLINE_QA_KNOWLEDGE = [
    {
        "keywords": ["daag", "dhabbe", "dhabba", "dag", "karpa", "blight", "spot", "spots", "पीला", "सुख", "धब्बा", "दाग", "डाग", "करपा"],
        "hi": "पत्तियों पर छल्लेदार भूरे या काले धब्बे आमतौर पर अर्ली ब्लाइट (अगेती झुलसा) या फफूंद जनित रोगों के लक्षण हैं।\n• खेत की निचली ग्रसित पत्तियों को काटकर नष्ट करें।\n• खेत में जल निकासी सुनिश्चित करें ताकि नमी न बढ़े।\n• जैविक रोकथाम: 5 ग्राम/लीटर ट्राइकोडर्मा हरजिएनम या 5% नीम तेल (3 मिली/लीटर) का छिड़काव करें।",
        "mr": "पानांवरील काळे किंवा तपकिरी गोलाकार डाग करपा रोगाचे प्राथमिक लक्षण असू शकतात.\n• खालील बाधित पाने खुडून शेताबाहेर नष्ट करा.\n• शेतात पाणी साचणार नाही याची काळजी घ्या.\n• जैविक उपाय: ट्रायकोडर्मा ५ ग्रॅम/लिटर किंवा ५% निंबोळी अर्क (३ मिली/लिटर) फवारा.",
        "en": "Concentric brown/black lesions typically indicate fungal early blight or leaf spot.\n• Prune and dispose of infected lower leaves away from the field.\n• Maintain raised-bed drainage to avoid stagnant moisture.\n• Bio-control: Spray Trichoderma harzianum @ 5g/L or cold-pressed Neem oil @ 3ml/L."
    },
    {
        "keywords": ["weather", "mausam", "havaman", "risk", "khatra", "dhoka", "humidity", "rain", "मौसम", "हवामान", "जोखिम", "खतरा", "धोका", "आर्द्रता"],
        "hi": "उच्च आर्द्रता (75% से अधिक) और 28-32°C तापमान फफूंद बीजाणुओं के अंकुरण के लिए अनुकूल होता है।\n• आगामी दिनों में बादल या बारिश होने पर कीटनाशक छिड़काव रोक दें।\n• खेत की मेड़ों पर जलभराव न होने दें।\n• मित्र कीटों के संरक्षण हेतु पीले चिपचिपे कार्ड लगाएं।",
        "mr": "हवेतील दमटपणा ७५% पेक्षा जास्त राहिल्यास बुरशीजन्य रोगांचा प्रादुर्भाव वेगाने वाढतो.\n• पावसाची शक्यता असल्यास त्वरित रासायनिक फवारणी टाळा.\n• शेतामध्ये हवा खेळती राहील अशी व्यवस्था करा.\n• एकरी १५-२० पिवळे चिकट सापळे लावा.",
        "en": "High relative humidity (>75%) coupled with 28-32°C ambient temperature accelerates fungal spore germination.\n• Avoid foliar sprays when rain is forecasted within 24 hours.\n• Ensure proper field drainage trenches.\n• Install 15-20 yellow sticky traps per acre."
    },
    {
        "keywords": ["dashparni", "organic", "neem", "jaivik", "दशपर्णी", "जैविक", "नीम", "अर्क"],
        "hi": "दशपर्णी अर्क 10 कड़वे औषधीय पत्तों (नीम, करंज, अरंडी, निर्गुंडी, धतूरा आदि) और गोमूत्र से तैयार प्राकृतिक कीटनाशक है।\n• मात्रा: 25-30 मिली प्रति लीटर पानी में मिलाकर छानकर छिड़कें।\n• यह माहू (मावा), सफेद मक्खी और रस चूसक कीटों को सुरक्षित नियंत्रित करता है।",
        "mr": "दशपर्णी अर्क १० कडू झाडांच्या पानांपासून (कडुलिंब, करंज, धोतरा, निर्गुडी) व गोमूत्रापासून बनवले जाते.\n• प्रमाण: २५-३० मिली प्रति लिटर पाण्यात मिसळून फवारावे.\n• मावा, तुडतुडे व पांढरी माशी या रस शोषक किडींवर अत्यंत प्रभावी.",
        "en": "Dashparni Ark is an organic botanical concoction prepared from 10 bitter indigenous leaves and cow urine.\n• Dosage: 25-30 ml per liter of water.\n• Highly effective against sucking pests including aphids, jassids, and whiteflies."
    },
    {
        "keywords": ["fertilizer", "khad", "khat", "npk", "urea", "खाद", "खत", "यूरिया"],
        "hi": "फसल की वृद्धि अवस्था अनुसार संतुलित पोषण दें:\n• वानस्पतिक अवस्था (Vegetative): 19:19:19 @ 5 ग्राम/लीटर।\n• फूल आने पर (Flowering): 12:61:00 (मोनो अमोनियम फॉस्फेट) @ 4-5 ग्राम/लीटर।\n• फल विकास (Fruiting): 00:52:34 या 00:00:50 @ 5 ग्राम/लीटर।",
        "mr": "पिकाच्या वाढीनुसार योग्य विद्राव्य खते द्या:\n• शाकीय वाढ: १९:१९:१९ @ ५ ग्रॅम/लिटर.\n• फुलोरा अवस्था: १२:६१:०० @ ४-५ ग्रॅम/लिटर.\n• फळ धारणा: ००:५२:३४ किंवा ००:००:५० @ ५ ग्रॅम/लिटर.",
        "en": "Provide balanced soluble nutrition per growth stage:\n• Vegetative stage: NPK 19:19:19 @ 5g/L.\n• Flowering stage: NPK 12:61:00 @ 4-5g/L.\n• Fruit development: NPK 00:52:34 or 00:00:50 @ 5g/L."
    }
]

def get_offline_response(user_query: str, lang: str) -> str:
    query_lower = user_query.lower()
    for item in OFFLINE_QA_KNOWLEDGE:
        if any(kw in query_lower for kw in item["keywords"]):
            if lang == "mr":
                return item["mr"]
            elif lang == "en":
                return item["en"]
            return item["hi"]

    if lang == "mr":
        return "आपला प्रश्न नोंदवला आहे. पिकाची अचूक स्थिती समजण्यासाठी 'फोटो घ्या' पर्यायाद्वारे पानाचा फोटो तपासा किंवा स्थानिक KVK तज्ज्ञांचा सल्ला घ्या."
    elif lang == "en":
        return "Query noted. For exact plant diagnosis, please capture a clear leaf photo via the Scan screen or consult local Krishi Vigyan Kendra (KVK) agronomists."
    return "आपके सवाल को दर्ज कर लिया गया है। सटीक वैज्ञानिक पहचान के लिए 'फसल की फोटो लें' पर क्लिक करके पत्ते की फोटो जांचें या नजदीकी KVK विशेषज्ञ से संपर्क करें।"

@router.post("/chat", response_model=AIChatResponse)
async def chat_with_assistant(req: AIChatRequest):
    lang = req.language or "hi"
    user_msg = req.message.strip()

    if not user_msg:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # If Gemini API Key is available, invoke real Google Gemini API
    if GEMINI_API_KEY and len(GEMINI_API_KEY.strip()) > 5:
        system_instruction = (
            "You are Krushigan AI (कृषिगण कृषी मित्र), an expert agricultural scientist and plant pathologist assisting Indian farmers. "
            "Provide practical, scientifically validated, safe agricultural advice (Integrated Pest Management, biological agents like Trichoderma/Neem oil, and safe chemical practices). "
            f"Always reply in the user's requested language ({lang}): "
            "- If 'mr', reply in fluent, respectful Marathi (मराठी). "
            "- If 'hi', reply in clear, respectful Hindi (हिंदी). "
            "- If 'en', reply in English. "
            "Keep answers concise (under 120 words), formatted with bullet points for easy mobile reading and speech readout. "
            "Always include safety precautions when mentioning chemical sprays."
        )

        gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"Context: Farmer Crop: {req.crop or 'General'}, District: {req.district or 'India'}, Growth Stage: {req.growth_stage or 'Active'}\n\nQuestion: {user_msg}"}
                    ]
                }
            ],
            "systemInstruction": {
                "parts": [{"text": system_instruction}]
            },
            "generationConfig": {
                "temperature": 0.4,
                "maxOutputTokens": 350
            }
        }

        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.post(gemini_url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        text_parts = candidates[0].get("content", {}).get("parts", [])
                        if text_parts and "text" in text_parts[0]:
                            generated_answer = text_parts[0]["text"].strip()
                            return AIChatResponse(
                                answer=generated_answer,
                                language=lang,
                                isRealAI=True,
                                isOfflineDemo=False,
                                modelUsed=f"Google Gemini ({GEMINI_MODEL})"
                            )
        except Exception:
            pass  # Fall through to offline domain knowledge fallback

    # Graceful Offline Fallback
    offline_answer = get_offline_response(user_msg, lang)
    disclaimer_msg = (
        "ऑफलाइन मोड: इंटरनेट या GEMINI_API_KEY अनुपलब्ध होने के कारण पूर्व-निर्धारित कृषि ज्ञानकोष से उत्तर दिया गया है।"
        if lang == "hi"
        else "ऑफलाईन मोड: इंटरनेट किंवा API उपलब्ध नसल्याने मार्गदर्शक ज्ञानकोशातून उत्तर दिले आहे."
        if lang == "mr"
        else "Offline Mode: Response provided from verified local agronomic knowledge base."
    )

    return AIChatResponse(
        answer=offline_answer,
        language=lang,
        isRealAI=False,
        isOfflineDemo=True,
        modelUsed="Krushigan Agronomic Rule Engine (Offline Fallback)",
        disclaimer=disclaimer_msg
    )

