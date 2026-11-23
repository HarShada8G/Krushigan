import { 
  FarmerProfile, 
  CropReport, 
  WeatherData, 
  EnvironmentalRisk, 
  BroadcastAlert, 
  LearningPipelineMetrics 
} from '../types';
import { CROP_DISEASES } from './cropDiseases';

export const DEMO_FARMER: FarmerProfile = {
  id: "farmer_akola_01",
  name: "Ramesh Patil (रमेश पाटील)",
  phone: "+91 98223 45678",
  state: "Maharashtra",
  district: "Akola",
  taluka: "Akot",
  village: "Kavtha Kadu (कावठा कडू)",
  currentCrop: "Tomato",
  cropVariety: "Abhinav (Seminis)",
  growthStage: "Flowering",
  landAreaAcre: 3.5,
  locationConsent: true,
  latitude: 21.0975,
  longitude: 77.0583
};

export const DEMO_WEATHER: WeatherData = {
  district: "Akola",
  temperature: 32,
  humidity: 78,
  rainfallProbability: 40,
  windSpeedKmh: 14,
  condition: "Partly Cloudy with Humid Spells",
  conditionHi: "आंशिक बादल व उच्च आर्द्रता",
  conditionMr: "अंशतः ढगाळ व दमट हवामान",
  icon: "cloud-sun",
  forecast3Days: [
    { day: "कल (Tomorrow)", temp: 31, humidity: 82, rainProb: 60, condition: "Thunderstorms / Rain" },
    { day: "परसों (Day 2)", temp: 29, humidity: 85, rainProb: 75, condition: "Cloudy / Moderate Rain" },
    { day: "नरसों (Day 3)", temp: 30, humidity: 74, rainProb: 30, condition: "Passing Showers" }
  ],
  isDemoData: true
};

export const DEMO_ENVIRONMENTAL_RISK: EnvironmentalRisk = {
  crop: "Tomato",
  district: "Akola",
  riskLevel: "high",
  titleHi: "टमाटर में अर्ली ब्लाइट (झुलसा) का उच्च पर्यावरणीय खतरा",
  titleMr: "टोमॅटो पिकावर लवकर येणाऱ्या करप्याचा वाढता धोका",
  titleEn: "Elevated Fungal Early Blight Risk for Solanaceous Crops",
  descriptionHi: "अकोला व अकोट तहसील में 78-85% आर्द्रता तथा 30-32°C तापमान बना हुआ है। पिछले 3 दिनों में 42 नए अर्ली ब्लाइट केस दर्ज हुए हैं।",
  descriptionMr: "अकोला व अकोट तालुक्यात हवेतील आर्द्रता ७८-८५% राहिल्याने बुरशीचे बीजाणू वेगाने वाढण्यास पोषक वातावरण आहे.",
  descriptionEn: "Relative humidity exceeding 75% at 31°C creates optimal micro-climate for Alternaria spore proliferation.",
  contributingFactors: [
    "हवा में 78% से अधिक आर्द्रता (Relative Humidity)",
    "अकोट तहसील में 14 किमी/घंटा की गति से दक्षिण-पश्चिमी हवाएं (Spore dispersal)",
    "आगामी 48 घंटों में बारिश की 60% संभावना"
  ],
  suggestedActionHi: "खेत की निचली पत्तियों की तुरंत जांच करें। जलभराव न होने दें और अतिरिक्त पत्तियां हटाएं।",
  suggestedActionMr: "खालच्या पानांचे निरीक्षण करा. शेतात पाणी साचू देऊ नका आणि बाधीत पाने खुडून टाका.",
  suggestedActionEn: "Scout bottom canopy for concentric target-board lesions. Ensure raised bed drainage."
};

const earlyBlight = CROP_DISEASES[0];

export const INITIAL_DEMO_REPORTS: CropReport[] = [
  {
    id: "REP-2026-AKL-001",
    farmerId: DEMO_FARMER.id,
    farmerName: DEMO_FARMER.name,
    phone: DEMO_FARMER.phone,
    district: "Akola",
    taluka: "Akot",
    village: "Kavtha Kadu",
    crop: "Tomato",
    variety: "Abhinav",
    growthStage: "Flowering",
    imageUrl: "/images/crops/tomato_early_blight.jpg",
    timestamp: "2026-11-18 10:30 AM",
    status: "expert_confirmed",
    diagnosis: {
      id: "diag_001",
      reportId: "REP-2026-AKL-001",
      crop: "Tomato",
      detectedProblem: earlyBlight.name,
      hindiName: earlyBlight.nameHi,
      marathiName: earlyBlight.nameMr,
      confidenceScore: 0.94,
      severity: "medium",
      symptoms: earlyBlight.symptoms.hi,
      recommendations: {
        green: {
          title: earlyBlight.recommendations.green.titleHi,
          items: earlyBlight.recommendations.green.stepsHi
        },
        yellow: {
          title: earlyBlight.recommendations.yellow.titleHi,
          items: earlyBlight.recommendations.yellow.stepsHi,
          bioAgent: earlyBlight.recommendations.yellow.bioAgent
        },
        red: {
          title: earlyBlight.recommendations.red.titleHi,
          isCertified: earlyBlight.recommendations.red.isCertified,
          activeIngredient: earlyBlight.recommendations.red.activeIngredient,
          targetProblem: earlyBlight.recommendations.red.targetProblem,
          authoritySource: earlyBlight.recommendations.red.authoritySource,
          applicationInstructions: earlyBlight.recommendations.red.applicationInstructionsHi,
          safetyPrecautions: earlyBlight.recommendations.red.safetyPrecautionsHi,
          preHarvestInterval: `${earlyBlight.recommendations.red.preHarvestIntervalDays} दिन (Days)`,
          disclaimer: earlyBlight.recommendations.red.disclaimerHi
        }
      },
      environmentalRiskCorrelation: "उच्च आर्द्रता (78%) के कारण कवक विकास की तीव्रता बढ़ी",
      isSimulatedDemo: true
    },
    expertValidation: {
      expertId: "EXP-KVK-09",
      expertName: "Dr. Vinayak Shinde (KVK Akola)",
      verifiedDiagnosis: "Confirmed: Alternaria solani Early Stage",
      notes: "Early detection at lower nodes. Cultural pruning + biological drenching is sufficient at present stage.",
      validatedAt: "2026-11-18 02:45 PM",
      status: "confirmed"
    },
    followUpStatus: "improved",
    followUpNotes: "निचली पत्तियां हटाने और ट्राइकोडर्मा ड्रेंचिंग के बाद फैलाव रुक गया है।",
    followUpDate: "2026-11-20"
  },
  {
    id: "REP-2026-AKL-002",
    farmerId: "farmer_02",
    farmerName: "Sanjay Deshmukh (संजय देशमुख)",
    phone: "+91 97654 11223",
    district: "Akola",
    taluka: "Telhara",
    village: "Wari Bhairav",
    crop: "Tomato",
    variety: "Vaibhav",
    growthStage: "Fruiting",
    imageUrl: "/images/crops/tomato_leaf_curl.jpg",
    timestamp: "2026-11-19 03:15 PM",
    status: "pending",
    diagnosis: {
      id: "diag_002",
      reportId: "REP-2026-AKL-002",
      crop: "Tomato",
      detectedProblem: "Tomato Leaf Curl Virus (ToLCV)",
      hindiName: "पत्ती मरोड़ रोग (लीफ कर्ल वायरस)",
      marathiName: "चुरडा-मुरडा (पांढरी माशी प्रसार)",
      confidenceScore: 0.88,
      severity: "high",
      symptoms: [
        "पत्तियां ऊपर की ओर मुड़कर नाव के आकार की हो जाना",
        "पौधे का विकास रुकना व झाड़ीदार दिखना"
      ],
      recommendations: {
        green: {
          title: "🟢 पहले यह करें",
          items: [
            "पीले चिपचिपे कार्ड (Yellow Sticky Traps) 15-20 प्रति एकड़ लगाएं।",
            "अत्यधिक प्रभावित विषाणुग्रस्त पौधों को उखाड़कर नष्ट करें।"
          ]
        },
        yellow: {
          title: "🟡 जरूरत पड़ने पर",
          items: ["वर्टिसिलियम लेकानी (Verticillium lecanii) 5 ग्राम/लीटर पानी में छिड़कें।"],
          bioAgent: "Verticillium lecanii"
        },
        red: {
          title: "🔴 विशेषज्ञ की सलाह से",
          isCertified: true,
          activeIngredient: "Diafenthiuron 50% WP",
          targetProblem: "Whitefly Vector",
          authoritySource: "CIBRC / MPKV",
          applicationInstructions: "1.2 ग्राम प्रति लीटर पानी का छिड़काव पत्तियों के नीचे करें।",
          safetyPrecautions: ["दवा छिड़काव के समय सुरक्षा मास्क पहनें।"],
          preHarvestInterval: "5 दिन",
          disclaimer: "लेबल निर्देशों का कड़ाई से पालन करें।"
        }
      },
      environmentalRiskCorrelation: "शुष्क और गर्म हवाओं के कारण सफेद मक्खी की सक्रियता बढ़ी",
      isSimulatedDemo: true
    }
  },
  {
    id: "REP-2026-NSK-003",
    farmerId: "farmer_03",
    farmerName: "Balasaheb Shinde (बाळासाहेब शिंदे)",
    phone: "+91 94231 99887",
    district: "Nashik",
    taluka: "Niphad",
    village: "Pimpalgaon Baswant",
    crop: "Onion",
    variety: "Gavran (लाल कांदा)",
    growthStage: "Vegetative",
    imageUrl: "/images/crops/onion_purple_blotch.jpg",
    timestamp: "2026-11-20 09:10 AM",
    status: "pending",
    diagnosis: {
      id: "diag_003",
      reportId: "REP-2026-NSK-003",
      crop: "Onion",
      detectedProblem: "Purple Blotch (Alternaria porri)",
      hindiName: "बैंगनी धब्बा रोग (पर्पल ब्लॉच)",
      marathiName: "कांद्यावरील जांभळा करपा",
      confidenceScore: 0.91,
      severity: "severe",
      symptoms: [
        "कांदे के पत्तों पर पानी से भीगे छोटे धब्बे जो बाद में बैंगनी-भूरे हो जाते हैं",
        "पत्तियां बीच से टूटकर लटक जाना"
      ],
      recommendations: {
        green: {
          title: "🟢 पहले यह करें",
          items: [
            "खेत में पानी का निकास सुधारें, जलभराव न रहने दें।",
            "नत्र (यूरिया) का असंतुलित उपयोग तत्काल रोकें।"
          ]
        },
        yellow: {
          title: "🟡 जरूरत पड़ने पर",
          items: ["ट्राइकोडर्मा विरिडी 5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।"],
          bioAgent: "Trichoderma viride"
        },
        red: {
          title: "🔴 विशेषज्ञ की सलाह से",
          isCertified: true,
          activeIngredient: "Difenoconazole 25% EC",
          targetProblem: "Alternaria porri (Purple Blotch)",
          authoritySource: "Directorate of Onion and Garlic Research (DOGR), Rajgurunagar",
          applicationInstructions: "डाइफेनोकोनाजोल 1 मिली + स्टिकर (स्प्रेडर) 0.5 मिली प्रति लीटर पानी में मिलाकर छिड़काव करें।",
          safetyPrecautions: ["छिड़काव के समय आंख और त्वचा के संपर्क से बचें।"],
          preHarvestInterval: "15 दिन",
          disclaimer: "कृषि अधिकारी की सलाह पर ही रासायनिक कीटनाशक का प्रयोग करें।"
        }
      },
      environmentalRiskCorrelation: "नासिक में 88% आर्द्रता और बादल छाए रहने से फफूंद प्रसार चरम पर",
      isSimulatedDemo: true
    }
  }
];

export const DEMO_BROADCAST_ALERTS: BroadcastAlert[] = [
  {
    id: "ALT-2026-089",
    title: "Akola Tomato Early Blight Warning",
    district: "Akola",
    taluka: "Akot & Telhara",
    crop: "Tomato",
    diseaseOrPest: "Early Blight",
    riskLevel: "high",
    messageHi: "टमाटर किसानों के लिए सतर्कता: अगले 48 घंटों में उच्च आर्द्रता के कारण अगेती झुलसा का खतरा है। तुरंत निचली पत्तियों की जांच करें व खेत में पानी न रुकने दें।",
    messageMr: "टोमॅटो उत्पादक शेतकऱ्यांसाठी इशारा: पुढील ४८ तासांत हवेतील दमटपणामुळे करपा रोगाचा धोका वाढू शकतो. पिकाची पाहणी करून योग्य ती खबरदारी घ्या.",
    messageEn: "Early Blight Outbreak Advisory: High humidity forecasted over next 48h. Inspect lower canopy and ensure trench drainage.",
    targetCount: 1240,
    dispatchedAt: "2026-11-19 04:00 PM",
    deliveryStatus: "simulated_sent",
    authorOfficer: "Dr. Sunita Deshmukh (DAO Akola)"
  },
  {
    id: "ALT-2026-088",
    title: "Nashik Onion Purple Blotch Advisory",
    district: "Nashik",
    taluka: "Niphad, Yeola, Dindori",
    crop: "Onion",
    diseaseOrPest: "Purple Blotch",
    riskLevel: "severe",
    messageHi: "प्याज किसानों के लिए आपातकालीन सलाह: लगातार रिमझिम बारिश से जामुनी धब्बा रोग का तीव्र फैलाव। प्रमाणित सुरक्षात्मक उपाय अपनाएं।",
    messageMr: "कांदा उत्पादक शेतकऱ्यांना तातडीचा इशारा: सततच्या ढगाळ वातावरणामुळे जांभळा करपा रोगाचा प्रादुर्भाव. तात्काळ प्रतिबंधक फवारणी करावी.",
    messageEn: "Severe Alert for Onion Growers: Continuous mist and overcast skies triggering rapid purple blotch spread across Niphad taluka.",
    targetCount: 3410,
    dispatchedAt: "2026-11-20 08:30 AM",
    deliveryStatus: "simulated_sent",
    authorOfficer: "V. R. Kadam (JDA Nashik Division)"
  }
];

export const DEMO_LEARNING_METRICS: LearningPipelineMetrics = {
  totalAnalyzed: 1420,
  pendingValidation: 38,
  expertConfirmed: 1140,
  expertCorrected: 185,
  unknownMarked: 57,
  datasetReadyCount: 1325,
  currentModelVersion: "MobileNetV3-CropHealth-v1.4",
  candidateModelVersion: "EfficientNetB2-Retrain-Candidate-v1.5",
  benchmarkAccuracy: 91.8,
  latestRetrainCandidateDate: "2026-11-15"
};
