import time
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Path
from app.models.schemas import (
    AnalyzeRequest, 
    DiagnosisResultSchema, 
    RecommendationsSchema, 
    GreenTier, 
    YellowTier, 
    RedTier,
    CropReportSchema,
    CropReportCreate
)

router = APIRouter(prefix="/api/reports", tags=["Reports & AI Diagnosis"])

# In-memory database of reports initialized with realistic demo cases
STORED_REPORTS: List[CropReportSchema] = [
    CropReportSchema(
        id="REP-2026-AKL-001",
        farmerId="farmer_akola_01",
        farmerName="Ramesh Patil (रमेश पाटील)",
        phone="+91 98223 45678",
        district="Akola",
        taluka="Akot",
        village="Kavtha Kadu",
        crop="Tomato",
        variety="Abhinav",
        growthStage="Flowering",
        imageUrl="/images/crops/tomato_early_blight.jpg",
        timestamp="2026-11-18 10:30 AM",
        status="expert_confirmed",
        diagnosis=DiagnosisResultSchema(
            id="diag_001",
            reportId="REP-2026-AKL-001",
            crop="Tomato",
            detectedProblem="Early Blight (Alternaria solani)",
            hindiName="अर्ली ब्लाइट (अगेती झुलसा)",
            marathiName="लवकर येणारा करपा",
            confidenceScore=0.94,
            severity="medium",
            symptoms=[
                "निचली पुरानी पत्तियों पर गहरे भूरे रंग के छल्लेदार धब्बे",
                "धब्बों के चारों ओर हल्का पीला घेरा"
            ],
            recommendations=RecommendationsSchema(
                green=GreenTier(
                    title="🟢 पहले यह करें",
                    items=[
                        "जमीन को छूने वाली निचली पत्तियों को तोड़कर खेत से दूर करें।",
                        "ड्रिप सिंचाई करें; शाम को फव्वारा सिंचाई न करें।"
                    ]
                ),
                yellow=YellowTier(
                    title="🟡 जरूरत पड़ने पर (प्रमाणित जैविक नियंत्रण)",
                    items=["ट्राइकोडर्मा हार्जिएनम 5 ग्राम/लीटर पानी में घोलकर ड्रेंचिंग करें।"],
                    bioAgent="Trichoderma harzianum"
                ),
                red=RedTier(
                    title="🔴 विशेषज्ञ की सलाह से (रासायनिक प्रबंधन)",
                    isCertified=True,
                    activeIngredient="Mancozeb 75% WP",
                    targetProblem="Alternaria solani",
                    authoritySource="ICAR NCIPM & MPKV Rahuri",
                    applicationInstructions="मेंकोजेब 2.5 ग्राम प्रति लीटर पानी का छिड़काव करें।",
                    safetyPrecautions=["सुरक्षात्मक मास्क व दस्ताने पहनें।"],
                    preHarvestInterval="7 दिन (Days)",
                    disclaimer="अधिकृत कृषि केंद्र से ही प्रमाणित कीटनाशक खरीदें।"
                )
            ),
            environmentalRiskCorrelation="उच्च आर्द्रता (78%) के कारण कवक विकास की तीव्रता बढ़ी",
            isSimulatedDemo=True
        ),
        followUpStatus="improved",
        followUpNotes="निचली पत्तियां हटाने से फैलाव रुक गया है।"
    ),
    CropReportSchema(
        id="REP-2026-AKL-002",
        farmerId="farmer_02",
        farmerName="Sanjay Deshmukh",
        phone="+91 97654 11223",
        district="Akola",
        taluka="Telhara",
        village="Wari Bhairav",
        crop="Tomato",
        variety="Vaibhav",
        growthStage="Fruiting",
        imageUrl="/images/crops/tomato_leaf_curl.jpg",
        timestamp="2026-11-19 03:15 PM",
        status="pending",
        diagnosis=DiagnosisResultSchema(
            id="diag_002",
            reportId="REP-2026-AKL-002",
            crop="Tomato",
            detectedProblem="Tomato Leaf Curl Virus (ToLCV)",
            hindiName="पत्ती मरोड़ रोग (लीफ कर्ल)",
            marathiName="चुरडा-मुरडा (पांढरी माशी)",
            confidenceScore=0.89,
            severity="high",
            symptoms=["पत्तियां ऊपर की ओर मुड़कर नाव के आकार की हो जाना"],
            recommendations=RecommendationsSchema(
                green=GreenTier(
                    title="🟢 पहले यह करें",
                    items=["पीले चिपचिपे कार्ड 15-20 प्रति एकड़ लगाएं।"]
                ),
                yellow=YellowTier(
                    title="🟡 जैविक",
                    items=["वर्टिसिलियम लेकानी 5 ग्राम/लीटर छिड़कें।"],
                    bioAgent="Verticillium lecanii"
                ),
                red=RedTier(
                    title="🔴 रासायनिक",
                    isCertified=True,
                    activeIngredient="Diafenthiuron 50% WP",
                    targetProblem="Whitefly Vector",
                    authoritySource="CIBRC",
                    applicationInstructions="1.2 ग्राम प्रति लीटर पानी",
                    safetyPrecautions=["सुरक्षा किट पहनें"],
                    preHarvestInterval="5 दिन"
                )
            ),
            environmentalRiskCorrelation="शुष्क गर्म हवा से कीट प्रकोप बढ़ा",
            isSimulatedDemo=True
        )
    ),
    CropReportSchema(
        id="REP-2026-NSK-003",
        farmerId="farmer_03",
        farmerName="Balasaheb Shinde (बाळासाहेब शिंदे)",
        phone="+91 94231 99887",
        district="Nashik",
        taluka="Niphad",
        village="Pimpalgaon Baswant",
        crop="Onion",
        variety="Gavran (लाल कांदा)",
        growthStage="Vegetative",
        imageUrl="/images/crops/onion_purple_blotch.jpg",
        timestamp="2026-11-20 09:10 AM",
        status="pending",
        diagnosis=DiagnosisResultSchema(
            id="diag_003",
            reportId="REP-2026-NSK-003",
            crop="Onion",
            detectedProblem="Purple Blotch (Alternaria porri)",
            hindiName="बैंगनी धब्बा रोग (पर्पल ब्लॉच)",
            marathiName="कांद्यावरील जांभळा करपा",
            confidenceScore=0.91,
            severity="severe",
            symptoms=[
                "कांदे के पत्तों पर पानी से भीगे छोटे धब्बे जो बाद में बैंगनी-भूरे हो जाते हैं",
                "पत्तियां बीच से टूटकर लटक जाना"
            ],
            recommendations=RecommendationsSchema(
                green=GreenTier(
                    title="🟢 पहले यह करें",
                    items=[
                        "खेत में पानी का निकास सुधारें, जलभराव न रहने दें।",
                        "नत्र (यूरिया) का असंतुलित उपयोग तत्काल रोकें।"
                    ]
                ),
                yellow=YellowTier(
                    title="🟡 जरूरत पड़ने पर",
                    items=["ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।"],
                    bioAgent="Trichoderma viride"
                ),
                red=RedTier(
                    title="🔴 विशेषज्ञ की सलाह से",
                    isCertified=True,
                    activeIngredient="Difenoconazole 25% EC",
                    targetProblem="Alternaria porri (Purple Blotch)",
                    authoritySource="Directorate of Onion and Garlic Research (DOGR), Rajgurunagar",
                    applicationInstructions="डाइफेनोकोनाजोल 1 मिली + स्टिकर 0.5 मिली प्रति लीटर पानी में मिलाकर छिड़काव करें।",
                    safetyPrecautions=["छिड़काव के समय आंख और त्वचा के संपर्क से बचें।"],
                    preHarvestInterval="15 दिन",
                    disclaimer="कृषि अधिकारी की सलाह पर ही रासायनिक कीटनाशक का प्रयोग करें।"
                )
            ),
            environmentalRiskCorrelation="नासिक में 88% आर्द्रता और बादल छाए रहने से फफूंद प्रसार चरम पर",
            isSimulatedDemo=True
        )
    )
]

@router.post("/analyze", response_model=DiagnosisResultSchema)
def analyze_crop(request: AnalyzeRequest):
    # Deterministic simulation of PyTorch MobileNet / EfficientNet inference
    crop_lower = request.crop.lower()

    if "cotton" in crop_lower or "कपास" in crop_lower:
        return DiagnosisResultSchema(
            id=f"diag_{int(time.time())}",
            reportId=f"REP-{int(time.time()) % 10000}",
            crop="Cotton",
            detectedProblem="Cotton Aphids (Aphis gossypii)",
            hindiName="कपास का माहू (एफिड्स)",
            marathiName="कापसावरील मावा कीड",
            confidenceScore=0.92,
            severity="medium",
            symptoms=[
                "नई पत्तियों व कलियों पर छोटे पीले-हरे कीड़ों का जमावड़ा",
                "रस चूसने के कारण पत्तियों का मुड़ना"
            ],
            recommendations=RecommendationsSchema(
                green=GreenTier(
                    title="🟢 पहले यह करें (प्राकृतिक मित्र कीट)",
                    items=["लेडीबर्ड बीटल का संरक्षण करें। तेज पानी के फव्वारे से कीटों को नीचे गिराएं।"]
                ),
                yellow=YellowTier(
                    title="🟡 जैविक नियंत्रण",
                    items=["व्यूवेरिया बेसियाना 5 ग्राम/लीटर अथवा 5% नीम तेल का छिड़काव करें।"],
                    bioAgent="Beauveria bassiana"
                ),
                red=RedTier(
                    title="🔴 विशेषज्ञ की सलाह से (रासायनिक)",
                    isCertified=True,
                    activeIngredient="Flonicamid 50% WG",
                    targetProblem="Aphis gossypii",
                    authoritySource="CICR Nagpur & MPKV Rahuri",
                    applicationInstructions="0.3 ग्राम प्रति लीटर पानी",
                    safetyPrecautions=["बिना सुरक्षा उपकरण छिड़काव न करें।"],
                    preHarvestInterval="14 दिन",
                    disclaimer="आर्थिक नुकसान सीमा (ETL) पार होने पर ही प्रयोग करें।"
                )
            ),
            environmentalRiskCorrelation="बादल छाए रहने व नमी से कीट संख्या में वृद्धि",
            isSimulatedDemo=True
        )
    elif "onion" in crop_lower or "प्याज" in crop_lower or "कांदा" in crop_lower:
        return DiagnosisResultSchema(
            id=f"diag_{int(time.time())}",
            reportId=f"REP-{int(time.time()) % 10000}",
            crop="Onion",
            detectedProblem="Purple Blotch (Alternaria porri)",
            hindiName="बैंगनी धब्बा रोग (पर्पल ब्लॉच)",
            marathiName="कांद्यावरील जांभळा करपा",
            confidenceScore=0.91,
            severity="severe",
            symptoms=["कांदे की पत्तियों पर बैंगनी-भूरे धब्बे जो टूटकर लटक जाते हैं"],
            recommendations=RecommendationsSchema(
                green=GreenTier(
                    title="🟢 पहले यह करें",
                    items=["खेत में पानी का निकास सुधारें, जलभराव न रहने दें।"]
                ),
                yellow=YellowTier(
                    title="🟡 जैविक नियंत्रण",
                    items=["ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर पानी में मिलाकर छिड़कें।"],
                    bioAgent="Trichoderma viride"
                ),
                red=RedTier(
                    title="🔴 विशेषज्ञ की सलाह से",
                    isCertified=True,
                    activeIngredient="Difenoconazole 25% EC",
                    targetProblem="Alternaria porri",
                    authoritySource="Directorate of Onion and Garlic Research (DOGR)",
                    applicationInstructions="1 मिली प्रति लीटर पानी + स्टीकर 0.5 मिली",
                    safetyPrecautions=["दस्ताने व मास्क का प्रयोग अनिवार्य है।"],
                    preHarvestInterval="15 दिन"
                )
            ),
            environmentalRiskCorrelation="नासिक में 88% आर्द्रता से फफूंद प्रसार चरम पर",
            isSimulatedDemo=True
        )
    else:
        # Default Tomato Early Blight
        return STORED_REPORTS[0].diagnosis

@router.get("/history", response_model=List[CropReportSchema])
def get_reports_history():
    return STORED_REPORTS

@router.get("/{report_id}", response_model=CropReportSchema)
def get_report_by_id(report_id: str = Path(...)):
    for r in STORED_REPORTS:
        if r.id == report_id:
            return r
    raise HTTPException(status_code=404, detail="Report not found")

@router.post("", response_model=CropReportSchema)
def create_report(report_data: CropReportCreate):
    new_report = CropReportSchema(
        id=f"REP-2026-AKL-{int(time.time()) % 1000:03d}",
        farmerId=report_data.farmerId,
        farmerName=report_data.farmerName,
        phone=report_data.phone,
        district=report_data.district,
        taluka=report_data.taluka,
        village=report_data.village,
        crop=report_data.crop,
        variety=report_data.variety,
        growthStage=report_data.growthStage,
        imageUrl=report_data.imageUrl,
        timestamp=time.strftime("%Y-%m-%d %I:%M %p"),
        status="ai_analyzed",
        diagnosis=report_data.diagnosis
    )
    STORED_REPORTS.insert(0, new_report)
    return new_report
