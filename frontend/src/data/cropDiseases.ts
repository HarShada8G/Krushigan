export interface DiseaseDetail {
  id: string;
  crop: string;
  name: string;
  nameHi: string;
  nameMr: string;
  type: 'fungal' | 'bacterial' | 'viral' | 'pest';
  typicalSeverity: 'low' | 'medium' | 'high' | 'severe';
  symptoms: {
    hi: string[];
    mr: string[];
    en: string[];
  };
  environmentalTrigger: {
    tempMin: number;
    tempMax: number;
    humidityMin: number;
    descriptionHi: string;
    descriptionMr: string;
    descriptionEn: string;
  };
  recommendations: {
    green: {
      titleHi: string;
      titleMr: string;
      titleEn: string;
      stepsHi: string[];
      stepsMr: string[];
      stepsEn: string[];
    };
    yellow: {
      titleHi: string;
      titleMr: string;
      titleEn: string;
      bioAgent: string;
      stepsHi: string[];
      stepsMr: string[];
      stepsEn: string[];
    };
    red: {
      titleHi: string;
      titleMr: string;
      titleEn: string;
      isCertified: boolean;
      activeIngredient?: string;
      targetProblem?: string;
      authoritySource?: string;
      applicationInstructionsHi?: string;
      applicationInstructionsMr?: string;
      applicationInstructionsEn?: string;
      safetyPrecautionsHi?: string[];
      safetyPrecautionsMr?: string[];
      safetyPrecautionsEn?: string[];
      preHarvestIntervalDays?: number;
      disclaimerHi?: string;
      disclaimerMr?: string;
      disclaimerEn?: string;
    };
  };
}

export const CROP_DISEASES: DiseaseDetail[] = [
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    name: "Early Blight (Alternaria solani)",
    nameHi: "अर्ली ब्लाइट (अगेती झुलसा)",
    nameMr: "लवकर येणारा करपा (अल्टरनेरिया)",
    type: "fungal",
    typicalSeverity: "medium",
    symptoms: {
      hi: [
        "निचली पुरानी पत्तियों पर गहरे भूरे रंग के छल्लेदार (Target-board) धब्बे",
        "धब्बों के चारों ओर हल्का पीला घेरा (क्लोरोटिक हेलो)",
        "संक्रमण बढ़ने पर पत्तियां सूखकर नीचे गिरना"
      ],
      mr: [
        "खालच्या जुन्या पानांवर काळे-तपकिरी गोलाकार चक्राकार ठिपके",
        "ठिपक्यांभोवती पिवळसर वलय तयार होणे",
        "रोग वाढल्यास पाने सुकणे व गळून पडणे"
      ],
      en: [
        "Concentric ring 'target-board' brown lesions on lower older leaves",
        "Yellow chlorotic halo surrounding necrotic spots",
        "Premature defoliation starting from bottom canopy"
      ]
    },
    environmentalTrigger: {
      tempMin: 22,
      tempMax: 30,
      humidityMin: 75,
      descriptionHi: "24-28°C तापमान और 80% से अधिक आर्द्रता में फफूंद के बीजाणु तेजी से पनपते हैं।",
      descriptionMr: "२४-२८ अंश तापमान आणि ८०% पेक्षा जास्त आर्द्रता या बुरशीच्या वाढीसाठी अनुकूल असते.",
      descriptionEn: "High relative humidity (>75%) coupled with moderate temperatures (24-28°C) accelerates conidial germination."
    },
    recommendations: {
      green: {
        titleHi: "🟢 पहले यह करें (प्राथमिक व खेत स्वच्छता)",
        titleMr: "🟢 प्रथम हे करा (शेताची स्वच्छता)",
        titleEn: "🟢 Do This First (Immediate Sanitation)",
        stepsHi: [
          "जमीन को छूने वाली निचली संक्रमित पत्तियों को तोड़कर खेत से दूर नष्ट करें।",
          "ड्रिप सिंचाई करें ताकि पत्तियां गीली न रहें। शाम के समय फव्वारा सिंचाई न करें।",
          "पौधों के बीच पर्याप्त दूरी (हवा का संचार) बनाए रखें।"
        ],
        stepsMr: [
          "जमिनीला टेकलेली रोगट पाने खुडून शेताबाहेर खड्ड्यात गाडून टाका.",
          "ठिबक सिंचनाचा वापर करा; पानावरील ओलावा टाळा, संध्याकाळी पाणी देऊ नका.",
          "झाडांमध्ये मोकळी हवा खेळती राहील अशी व्यवस्था ठेवा."
        ],
        stepsEn: [
          "Prune lower infected canopy leaves and safely compost away from crop field.",
          "Switch to drip irrigation; avoid overhead sprinklers in late evening to keep foliage dry.",
          "Ensure adequate staking and spacing for cross-ventilation."
        ]
      },
      yellow: {
        titleHi: "🟡 जरूरत पड़ने पर (प्रमाणित जैविक नियंत्रण)",
        titleMr: "🟡 गरज भासल्यास (जैविक नियंत्रण)",
        titleEn: "🟡 If Needed (Verified Biological Control)",
        bioAgent: "Trichoderma harzianum / Pseudomonas fluorescens",
        stepsHi: [
          "ट्राइकोडर्मा हार्जिएनम (Trichoderma harzianum) 5 ग्राम प्रति लीटर पानी में मिलाकर तने व जड़ के पास ड्रेंचिंग करें।",
          "5% नीम तेल (Neem Oil 10,000 ppm) 2-3 मिली/लीटर पानी का पर्णीय छिड़काव फफूंद फैलाव रोकता है।"
        ],
        stepsMr: [
          "ट्रायकोडर्मा हार्झियानम ५ ग्रॅम प्रति लिटर पाण्यात मिसळून आळवणी करा.",
          "५% निंबोळी अर्क किंवा नीम तेल (१०,००० पीपीएम) २-३ मिली/लिटर फवारणी करा."
        ],
        stepsEn: [
          "Soil drench or foliar spray Trichoderma harzianum @ 5g/L water during early twilight.",
          "Apply cold-pressed Neem Seed Kernel Extract (5%) or Neem oil 10,000 ppm @ 2-3 ml/L as an antifeedant/fungistatic shield."
        ]
      },
      red: {
        titleHi: "🔴 विशेषज्ञ की सलाह से (प्रमाणित रासायनिक प्रबंधन)",
        titleMr: "🔴 तज्ज्ञांच्या सल्ल्याने (प्रमाणित रासायनिक उपाय)",
        titleEn: "🔴 Under Expert Guidance (Certified Chemical Control)",
        isCertified: true,
        activeIngredient: "Mancozeb 75% WP or Chlorothalonil 75% WP",
        targetProblem: "Alternaria solani (Early Blight)",
        authoritySource: "ICAR - National Research Centre for Integrated Pest Management (NCIPM) & MPKV Rahuri",
        applicationInstructionsHi: "मेंकोजेब 75% WP (Mancozeb) 2.5 ग्राम प्रति लीटर पानी अथवा क्लोरोथैलोनिल 2 ग्राम प्रति लीटर पानी का छिड़काव करें। 10-12 दिनों बाद आवश्यकतानुसार दोहराएं।",
        applicationInstructionsMr: "मँकोझेब ७५% डब्ल्यूपी (Mancozeb) २.५ ग्रॅम प्रति लिटर पाणी किंवा क्लोरोथॅलोनिल २ ग्रॅम/लिटर फवारावे. १०-१२ दिवसांनी गरजेनुसार पुनरावृत्ती करावी.",
        applicationInstructionsEn: "Foliar spray of Mancozeb 75% WP @ 2.5 g/L or Chlorothalonil 75% WP @ 2 g/L on dry leaf surface using hollow cone nozzle.",
        safetyPrecautionsHi: [
          "छिड़काव के समय मास्क, दस्ताने और चश्मा अवश्य पहनें।",
          "हवा के विपरीत दिशा में कभी भी छिड़काव न करें।",
          "तुड़ाई पूर्व सुरक्षित अंतर (PHI) का कड़ाई से पालन करें।"
        ],
        safetyPrecautionsMr: [
          "फवारणी करताना मास्क, हातमोजे आणि चष्मा नक्की वापरा.",
          "वाऱ्याच्या विरुद्ध दिशेने फवारणी करू नका.",
          "काढणीपूर्वी सुरक्षित अंतराचे (PHI) काटेकोर पालन करा."
        ],
        safetyPrecautionsEn: [
          "Always wear PPE (respiratory mask, nitrile gloves, face shield) during tank mix and spray.",
          "Never spray downwind or in gusty wind (>15 km/h).",
          "Strictly observe Pre-Harvest Interval (PHI) before picking tomatoes."
        ],
        preHarvestIntervalDays: 7,
        disclaimerHi: "दवा की खरीद केवल अधिकृत कृषि केंद्र से पक्के बिल के साथ करें। लेबल निर्देशों का पालन करें।",
        disclaimerMr: "कीटकनाशक खरेदी अधिकृत कृषी सेवा केंद्रातून पक्क्या बिलासह करा. लेबलवरील सूचना वाचा.",
        disclaimerEn: "Procure registered formulations only from licensed agricultural input dealers with batch GST invoice."
      }
    }
  },
  {
    id: "tomato_leaf_curl",
    crop: "Tomato",
    name: "Tomato Leaf Curl Virus (ToLCV)",
    nameHi: "पत्ती मरोड़ रोग (लीफ कर्ल वायरस)",
    nameMr: "पर्णगुच्छ रोग (चुरडा-मुरडा / पांढरी माशी प्रसार)",
    type: "viral",
    typicalSeverity: "high",
    symptoms: {
      hi: [
        "पत्तियां ऊपर की ओर मुड़कर नाव के आकार की हो जाना",
        "पौधे का विकास रुकना व झाड़ीदार (बौना) दिखना",
        "फूल व फल झड़ने लगना या बहुत छोटे फल बनना"
      ],
      mr: [
        "पाने वरच्या बाजूला वळणे व बोटीच्या आकारासारखी होणे",
        "रोपांची वाढ खुंटणे व झाड खुजे/झुडुपासारखे दिसणे",
        "फुले गळणे आणि फळे न लागणे"
      ],
      en: [
        "Severe upward curling and puckering of leaves with vein thickening",
        "Stunting of plants with bushy, rosette apical growth",
        "Drastic flower drop and distorted, undersized fruit set"
      ]
    },
    environmentalTrigger: {
      tempMin: 28,
      tempMax: 38,
      humidityMin: 40,
      descriptionHi: "गर्म व शुष्क मौसम में सफेद मक्खी (Whitefly) तेजी से फैलकर वायरस का प्रसार करती है।",
      descriptionMr: "उष्ण आणि कोरड्या हवामानात पांढरी माशी वेगाने वाढते आणि विषाणू पसरवते.",
      descriptionEn: "Warm, dry microclimate accelerates whitefly (Bemisia tabaci) vector populations."
    },
    recommendations: {
      green: {
        titleHi: "🟢 पहले यह करें (रोकथाम व ट्रैप)",
        titleMr: "🟢 प्रथम हे करा (सापळे व स्वच्छता)",
        titleEn: "🟢 Do This First (Mechanical & Cultural)",
        stepsHi: [
          "पीले चिपचिपे कार्ड (Yellow Sticky Traps) प्रति एकड़ 15-20 लगाएं ताकि सफेद मक्खी पकड़ी जा सके।",
          "खेत में अत्यधिक प्रभावित रोगग्रस्त पौधों को तुरंत उखाड़कर नष्ट करें (वायरस का कोई सीधा इलाज नहीं है)।",
          "खेत के चारों ओर मक्का या ज्वार की 2-3 कतारें बॉर्डर क्रॉप के रूप में लगाएं।"
        ],
        stepsMr: [
          "एकर मागे १५-२० पिवळे चिकट सापळे (Yellow Sticky Traps) लावा.",
          "अतिबाधित विषाणूग्रस्त झाडे उपटून शेताबाहेर नष्ट करा.",
          "शेताच्या चारी बाजूंना मका किंवा ज्वारीचे २-३ ओळींचे सजीव कुंपण लावा."
        ],
        stepsEn: [
          "Deploy 15-20 yellow sticky traps per acre at canopy height to monitor and mass-trap whitefly vectors.",
          "Rogue out and bury severely infected viral plants (viral load cannot be cured once systemic).",
          "Plant border barrier crops of maize or sorghum (2-3 rows) to impede vector flight."
        ]
      },
      yellow: {
        titleHi: "🟡 जरूरत पड़ने पर (जैविक वाहक नियंत्रण)",
        titleMr: "🟡 गरज भासल्यास (जैविक कीड नियंत्रण)",
        titleEn: "🟡 If Needed (Biological Vector Suppression)",
        bioAgent: "Verticillium lecanii (Lecanicillium lecanii)",
        stepsHi: [
          "वर्टिसिलियम लेकानी (Verticillium lecanii) 5 ग्राम/लीटर पानी का छिड़काव पत्तियों की निचली सतह पर करें।",
          "दशपर्णी अर्क (Dashparni Ark) 25 मिली/लीटर पानी का छिड़काव रस चूसक कीड़ों को भगाता है।"
        ],
        stepsMr: [
          "व्हर्टिसिलियम लेकानी ५ ग्रॅम/लिटर पाण्यात मिसळून पानाच्या मागच्या बाजूला फवारा.",
          "दशपर्णी अर्क २५ मिली प्रति लिटर पाण्यात मिसळून रस शोषणाऱ्या किडींवर फवारा."
        ],
        stepsEn: [
          "Foliar spray of entomopathogenic fungus Lecanicillium lecanii @ 5 g/L during high humidity evenings.",
          "Spray indigenous Dashparni Ark @ 25-30 ml/L as a repellent against sap-sucking pests."
        ]
      },
      red: {
        titleHi: "🔴 विशेषज्ञ की सलाह से (वाहक कीटनाशक)",
        titleMr: "🔴 तज्ज्ञांच्या सल्ल्याने (वाहक नियंत्रण)",
        titleEn: "🔴 Under Expert Guidance (Vector Suppression)",
        isCertified: true,
        activeIngredient: "Diafenthiuron 50% WP or Spiromesifen 22.9% SC",
        targetProblem: "Bemisia tabaci (Whitefly Vector of ToLCV)",
        authoritySource: "Central Insecticides Board & Registration Committee (CIBRC) / Vasantrao Naik Marathwada Krishi Vidyapeeth",
        applicationInstructionsHi: "सफेद मक्खी की आर्थिक सीमा (ETL) पार होने पर डायफेनथियुरॉन 50% WP 1.2 ग्राम/लीटर अथवा स्पाइरोमेसिफेन 1 मिली/लीटर पानी में छिड़कें।",
        applicationInstructionsMr: "पांढऱ्या माशीचा प्रादुर्भाव वाढल्यास डायफेनथियुरॉन ५०% डब्ल्यूपी १.२ ग्रॅम/लिटर किंवा स्पायरोमेसिफेन १ मिली/लिटर फवारावे.",
        applicationInstructionsEn: "If whitefly population crosses ETL (5-10 nymphs/leaf), spray Diafenthiuron 50% WP @ 1.2 g/L or Spiromesifen 22.9% SC @ 1.0 ml/L.",
        safetyPrecautionsHi: [
          "फूल खिलने के समय मधुमक्खियों की रक्षा हेतु सुबह 10 बजे से शाम 4 बजे के बीच रासायनिक छिड़काव न करें।",
          "एक ही रासायनिक वर्ग के कीटनाशक का बार-बार प्रयोग न करें (प्रतिरोधक क्षमता से बचाव)।"
        ],
        safetyPrecautionsMr: [
          "मधमाशांचे रक्षण करण्यासाठी फुले उमलण्याच्या वेळी कडक उन्हात फवारणी टाळा.",
          "एकाच प्रकारच्या कीटकनाशकाची वारंवार फवारणी करू नका."
        ],
        safetyPrecautionsEn: [
          "Protect pollinator bees; do not spray during peak foraging hours (10 AM - 3 PM).",
          "Rotate chemical modes of action to prevent IRAC vector resistance."
        ],
        preHarvestIntervalDays: 5,
        disclaimerHi: "केवल प्रमाणित स्रोतों से अनुमोदित खुराक का उपयोग करें।",
        disclaimerMr: "फक्त तज्ज्ञ शिफारसीनुसार प्रमाण वापरा.",
        disclaimerEn: "Use strictly at university-recommended dilution rates."
      }
    }
  },
  {
    id: "cotton_aphids",
    crop: "Cotton",
    name: "Cotton Aphids (Aphis gossypii)",
    nameHi: "कपास का माहू / एफिड",
    nameMr: "कापसावरील मावा कीड",
    type: "pest",
    typicalSeverity: "medium",
    symptoms: {
      hi: [
        "नई पत्तियों और कलियों पर छोटे पीले-हरे कीड़ों का जमावड़ा",
        "पत्तियां नीचे की ओर मुड़ना व रस चूसने से पीली पड़ना",
        "मधुस्राव (Honeydew) के कारण पत्तियों पर काली फफूंद (Sooty mold) जमना"
      ],
      mr: [
        "कोवळ्या पानांवर व शेंड्यावर पिवळसर-हिरव्या रंगाच्या लहान किडींचा प्रादुर्भाव",
        "पाने वाटीसारखी उलटी वळणे आणि रस शोषल्यामुळे पिवळी पडणे",
        "चिकट द्रवामुळे पानांवर काळी बुरशी (काळी काजळी) तयार होणे"
      ],
      en: [
        "Dense colonies of tiny pear-shaped yellowish-green aphids on tender shoots",
        "Downward cupping of leaves with sticky honeydew secretions",
        "Secondary development of black sooty mold impairing photosynthesis"
      ]
    },
    environmentalTrigger: {
      tempMin: 20,
      tempMax: 32,
      humidityMin: 65,
      descriptionHi: "बादल छाए रहने और हल्की हवा के मौसम में माहू की संख्या तेजी से बढ़ती है।",
      descriptionMr: "ढगाळ वातावरण आणि दमट हवेत मावा किडीचा उद्रेक झपाट्याने होतो.",
      descriptionEn: "Overcast skies with moderate temperatures trigger rapid asexual nymph proliferation."
    },
    recommendations: {
      green: {
        titleHi: "🟢 पहले यह करें (प्राकृतिक मित्र कीट संरक्षण)",
        titleMr: "🟢 प्रथम हे करा (मित्रकीटकांचे रक्षण)",
        titleEn: "🟢 Do This First (Conserve Natural Predators)",
        stepsHi: [
          "खेत में लेडीबर्ड बीटल (Ladybird beetle) और सिरफिड मक्खी जैसे मित्र कीटों को पहचानें और उन्हें न मारें।",
          "पानी का तेज फव्वारा मारकर शुरुआती कीटों को पत्तियों से नीचे गिराएं।"
        ],
        stepsMr: [
          "शेतातील ढालकीटक (Ladybird beetle) या मित्रकिडींचे रक्षण करा.",
          "पाण्याचा जोरदार फवारा मारून कोवळ्या पानावरील मावा धुवून काढा."
        ],
        stepsEn: [
          "Inspect for and protect predatory Coccinellid beetles (Ladybird grubs eat 50+ aphids daily).",
          "Spray high-pressure water stream on tender foliage to physically dislodge early clusters."
        ]
      },
      yellow: {
        titleHi: "🟡 जरूरत पड़ने पर (जैविक नियंत्रण)",
        titleMr: "🟡 गरज भासल्यास (जैविक उपाय)",
        titleEn: "🟡 If Needed (Biopesticide Option)",
        bioAgent: "Beauveria bassiana",
        stepsHi: [
          "व्यूवेरिया बेसियाना (Beauveria bassiana) 5 ग्राम प्रति लीटर पानी का छिड़काव करें।",
          "नीम तेल (1500 ppm) 5 मिली प्रति लीटर पानी मिलाकर पत्तियों के नीचे छिड़कें।"
        ],
        stepsMr: [
          "बिव्हेरिया बॅसियाना ५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.",
          "निंबोळी तेल (१५०० पीपीएम) ५ मिली प्रति लिटर पाण्यात मिसळून फवारा."
        ],
        stepsEn: [
          "Apply bio-fungal spray Beauveria bassiana @ 5 g/L.",
          "Neem based formulation (1500 ppm azadirachtin) @ 5 ml/L on undersides of leaves."
        ]
      },
      red: {
        titleHi: "🔴 विशेषज्ञ की सलाह से (रासायनिक)",
        titleMr: "🔴 तज्ज्ञांच्या सल्ल्याने (रासायनिक)",
        titleEn: "🔴 Under Expert Guidance (Certified Insecticide)",
        isCertified: true,
        activeIngredient: "Flonicamid 50% WG",
        targetProblem: "Aphis gossypii (Cotton Aphid ETL >10% plants)",
        authoritySource: "CICR Nagpur & MPKV Rahuri Cotton Advisory",
        applicationInstructionsHi: "यदि 10% से अधिक पौधों पर गंभीर प्रकोप हो तो फ्लोनिकामिड 50% WG 0.3 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।",
        applicationInstructionsMr: "१०% पेक्षा जास्त झाडांवर प्रादुर्भाव असल्यास फ्लोनिकामिड ५०% डब्ल्यूजी ०.३ ग्रॅम प्रति लिटर पाण्यात फवारावे.",
        applicationInstructionsEn: "Spray Flonicamid 50% WG @ 0.3 g/L water targeting selective chordotonal organ suppression.",
        safetyPrecautionsHi: ["सिंथेटिक पाइरेथ्रोइड्स के अनावश्यक उपयोग से बचें, इससे माहू का प्रकोप और बढ़ सकता है।"],
        safetyPrecautionsMr: ["अनावश्यक रासायनिक फवारणी टाळा."],
        safetyPrecautionsEn: ["Avoid broad-spectrum synthetic pyrethroids which cause pest resurgence."],
        preHarvestIntervalDays: 14
      }
    }
  },
  {
    id: "soybean_rust",
    crop: "Soybean",
    name: "Soybean Rust (Phakopsora pachyrhizi)",
    nameHi: "सोयाबीन गेरुआ / तांबेरा रोग",
    nameMr: "सोयाबीन तांबेरा रोग",
    type: "fungal",
    typicalSeverity: "severe",
    symptoms: {
      hi: [
        "पत्तियों की निचली सतह पर छोटे भूरे-लाल दानेदार फफोले (पुस्त्यूल)",
        "संक्रमित पत्तियां समय से पहले पीली होकर झड़ने लगना",
        "फली में दाने न भरना या दाने सिकुड़ जाना"
      ],
      mr: [
        "पानांच्या खालच्या बाजूला तांबूस-तपकिरी रंगाचे लहान पुरळ (pustules) दिसणे",
        "पाने पिवळी पडून अकाली गळणे",
        "शेंगांमध्ये दाणे न भरणे किंवा दाणे बारीक चपटे राहणे"
      ],
      en: [
        "Polygonal tan to reddish-brown uredinial pustules on underside of leaves",
        "Rapid yellowing and premature leaf senescence",
        "Severe yield reduction due to poorly filled shriveled pods"
      ]
    },
    environmentalTrigger: {
      tempMin: 18,
      tempMax: 26,
      humidityMin: 85,
      descriptionHi: "लगातार रिमझिम बारिश, 85% से अधिक आर्द्रता और ठंडा मौसम तांबेरा रोग के लिए सर्वाधिक अनुकूल है।",
      descriptionMr: "सलग ढगाळ हवामान, सतत पडणारा पाऊस आणि हवेत ८५% पेक्षा जास्त आर्द्रता असल्यास तांबेरा वेगाने पसरतो.",
      descriptionEn: "Extended leaf wetness (>6-8 hours) with temperatures between 18-26°C drives epidemic spread."
    },
    recommendations: {
      green: {
        titleHi: "🟢 पहले यह करें",
        titleMr: "🟢 प्रथम हे करा",
        titleEn: "🟢 Do This First",
        stepsHi: [
          "खेत की नियमित निगरानी करें; निचले पत्तों की दोनों सतहों की जांच करें।",
          "रोग प्रतिरोधी किस्में (जैसे फुले कल्याणी / फुले अग्रणी) का चयन करें।"
        ],
        stepsMr: [
          "शेताचे नियमित निरीक्षण करा, खालच्या पानांची तपासणी करा.",
          "तांबेरा प्रतिकारक वाणांची निवड करा."
        ],
        stepsEn: [
          "Intensive scout field twice weekly focusing on lower third canopy.",
          "Adopt resistant/tolerant cultivars recommended for Maharashtra agro-climatic zones."
        ]
      },
      yellow: {
        titleHi: "🟡 जरूरत पड़ने पर",
        titleMr: "🟡 गरज भासल्यास",
        titleEn: "🟡 If Needed",
        bioAgent: "Trichoderma viride + Pseudomonas",
        stepsHi: [
          "ट्राइकोडर्मा विरिडी 5 ग्राम/लीटर + स्यूडोमोनास 5 ग्राम/लीटर का संयुक्त छिड़काव शुरुआती अवस्था में करें।"
        ],
        stepsMr: [
          "ट्रायकोडर्मा विरिडी ५ ग्रॅम/लिटर अधिक स्यूडोमोनास ५ ग्रॅम/लिटर फवारणी करा."
        ],
        stepsEn: [
          "Foliar prophylactic application of Trichoderma viride @ 5g/L."
        ]
      },
      red: {
        titleHi: "🔴 विशेषज्ञ की सलाह से",
        titleMr: "🔴 तज्ज्ञांच्या सल्ल्याने",
        titleEn: "🔴 Under Expert Guidance",
        isCertified: true,
        activeIngredient: "Hexaconazole 5% SC or Tebuconazole 25.9% EC",
        targetProblem: "Phakopsora pachyrhizi (Asian Soybean Rust)",
        authoritySource: "ICAR-Indian Institute of Soybean Research (IISR) Indore",
        applicationInstructionsHi: "हेक्साकोनाजोल 5% SC 1 मिली/लीटर अथवा टेबुकोनाजोल 1 मिली/लीटर पानी में मिलाकर पहला लक्षण दिखते ही तुरंत छिड़कें।",
        applicationInstructionsMr: "हेक्साकोनॅझोल ५% एससी १ मिली/लिटर किंवा टेबुकोनॅझोल १ मिली/लिटर पाण्यात मिसळून रोगाची लक्षणे दिसताच फवारावे.",
        applicationInstructionsEn: "Foliar application of Hexaconazole 5% SC @ 1.0 ml/L or Tebuconazole 25.9% EC @ 1.0 ml/L at first appearance of uredinia.",
        safetyPrecautionsHi: ["सुरक्षा किट का उपयोग करें, कटाई से 20 दिन पहले छिड़काव बंद करें।"],
        safetyPrecautionsMr: ["काढणीपूर्वी २० दिवस अगोदर फवारणी थांबवा."],
        safetyPrecautionsEn: ["Observe strict 20-day pre-harvest interval before soybean pod harvest."],
        preHarvestIntervalDays: 20
      }
    }
  }
];
