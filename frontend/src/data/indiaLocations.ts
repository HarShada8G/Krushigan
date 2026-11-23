export interface DistrictInfo {
  name: string;
  nameHi: string;
  nameMr: string;
  lat: number;
  lng: number;
}

export interface StateInfo {
  name: string;
  nameHi: string;
  nameMr: string;
  center: { lat: number; lng: number };
  districts: DistrictInfo[];
}

export const INDIA_STATES_DATA: StateInfo[] = [
  {
    name: "Maharashtra",
    nameHi: "महाराष्ट्र",
    nameMr: "महाराष्ट्र",
    center: { lat: 19.7515, lng: 75.7139 },
    districts: [
      { name: "Akola", nameHi: "अकोला", nameMr: "अकोला", lat: 20.7002, lng: 77.0082 },
      { name: "Amravati", nameHi: "अमरावती", nameMr: "अमरावती", lat: 20.9374, lng: 77.7796 },
      { name: "Nagpur", nameHi: "नागपुर", nameMr: "नागपूर", lat: 21.1458, lng: 79.0882 },
      { name: "Nashik", nameHi: "नाशिक", nameMr: "नाशिक", lat: 19.9975, lng: 73.7898 },
      { name: "Pune", nameHi: "पुणे", nameMr: "पुणे", lat: 18.5204, lng: 73.8567 },
      { name: "Jalgaon", nameHi: "जलगांव", nameMr: "जळगाव", lat: 21.0077, lng: 75.5626 },
      { name: "Solapur", nameHi: "सोलापुर", nameMr: "सोलापूर", lat: 17.6599, lng: 75.9064 },
      { name: "Wardha", nameHi: "वर्धा", nameMr: "वर्धा", lat: 20.7453, lng: 78.6022 },
      { name: "Yavatmal", nameHi: "यवतमाल", nameMr: "यवतमाळ", lat: 20.3888, lng: 78.1204 },
      { name: "Buldhana", nameHi: "बुलढाणा", nameMr: "बुलढाणा", lat: 20.5293, lng: 76.1843 },
      { name: "Washim", nameHi: "वाशिम", nameMr: "वाशिम", lat: 20.1111, lng: 77.1354 },
      { name: "Latur", nameHi: "लातूर", nameMr: "लातूर", lat: 18.4088, lng: 76.5604 },
      { name: "Chhatrapati Sambhajinagar", nameHi: "छत्रपति संभाजीनगर", nameMr: "छत्रपती संभाजीनगर", lat: 19.8762, lng: 75.3433 },
      { name: "Kolhapur", nameHi: "कोल्हापुर", nameMr: "कोल्हापूर", lat: 16.7050, lng: 74.2433 },
      { name: "Satara", nameHi: "सतारा", nameMr: "सातारा", lat: 17.6805, lng: 73.9997 },
      { name: "Sangli", nameHi: "सांगली", nameMr: "सांगली", lat: 16.8524, lng: 74.5815 },
      { name: "Nanded", nameHi: "नांदेड़", nameMr: "नांदेड", lat: 19.1383, lng: 77.3210 }
    ]
  },
  {
    name: "Gujarat",
    nameHi: "गुजरात",
    nameMr: "गुजरात",
    center: { lat: 22.2587, lng: 71.1924 },
    districts: [
      { name: "Ahmedabad", nameHi: "अहमदाबाद", nameMr: "अहमदाबाद", lat: 23.0225, lng: 72.5714 },
      { name: "Surat", nameHi: "सूरत", nameMr: "सुरत", lat: 21.1702, lng: 72.8311 },
      { name: "Rajkot", nameHi: "राजकोट", nameMr: "राजकोट", lat: 22.3039, lng: 70.8022 },
      { name: "Vadodara", nameHi: "वडोदरा", nameMr: "वडोदरा", lat: 22.3072, lng: 73.1812 },
      { name: "Bhavnagar", nameHi: "भावनगर", nameMr: "भावनगर", lat: 21.7645, lng: 72.1519 },
      { name: "Junagadh", nameHi: "जूनागढ़", nameMr: "जुनागढ", lat: 21.5222, lng: 70.4579 },
      { name: "Anand", nameHi: "आनंद", nameMr: "आनंद", lat: 22.5645, lng: 72.9289 },
      { name: "Mehsana", nameHi: "मेहसाणा", nameMr: "मेहसाणा", lat: 23.5880, lng: 72.3693 }
    ]
  },
  {
    name: "Madhya Pradesh",
    nameHi: "मध्य प्रदेश",
    nameMr: "मध्य प्रदेश",
    center: { lat: 22.9734, lng: 78.6569 },
    districts: [
      { name: "Indore", nameHi: "इंदौर", nameMr: "इंदूर", lat: 22.7196, lng: 75.8577 },
      { name: "Bhopal", nameHi: "भोपाल", nameMr: "भोपाळ", lat: 23.2599, lng: 77.4126 },
      { name: "Ujjain", nameHi: "उज्जैन", nameMr: "उज्जैन", lat: 23.1765, lng: 75.7885 },
      { name: "Jabalpur", nameHi: "जबलपुर", nameMr: "जबलपूर", lat: 23.1815, lng: 79.9864 },
      { name: "Gwalior", nameHi: "ग्वालियर", nameMr: "ग्वाल्हेर", lat: 26.2183, lng: 78.1828 },
      { name: "Hoshangabad", nameHi: "नर्मदापुरम", nameMr: "नर्मदापुरम", lat: 22.7519, lng: 77.7289 },
      { name: "Chhindwara", nameHi: "छिंदवाड़ा", nameMr: "छिंदवाडा", lat: 22.0574, lng: 78.9382 },
      { name: "Dewas", nameHi: "देवास", nameMr: "देवास", lat: 22.9676, lng: 76.0534 }
    ]
  },
  {
    name: "Punjab",
    nameHi: "पंजाब",
    nameMr: "पंजाब",
    center: { lat: 31.1471, lng: 75.3412 },
    districts: [
      { name: "Ludhiana", nameHi: "लुधियाना", nameMr: "लुधियाना", lat: 30.9010, lng: 75.8573 },
      { name: "Amritsar", nameHi: "अमृतसर", nameMr: "अमृतसर", lat: 31.6340, lng: 74.8723 },
      { name: "Jalandhar", nameHi: "जालंधर", nameMr: "जालंधर", lat: 31.3260, lng: 75.5762 },
      { name: "Patiala", nameHi: "पटियाला", nameMr: "पतियाळा", lat: 30.3398, lng: 76.3869 },
      { name: "Bathinda", nameHi: "बठिंडा", nameMr: "भटिंडा", lat: 30.2110, lng: 74.9455 },
      { name: "Sangrur", nameHi: "संगरूर", nameMr: "संगरूर", lat: 30.2458, lng: 75.8421 },
      { name: "Firozpur", nameHi: "फिरोजपुर", nameMr: "फिरोजपूर", lat: 30.9237, lng: 74.6138 }
    ]
  },
  {
    name: "Haryana",
    nameHi: "हरियाणा",
    nameMr: "हरियाणा",
    center: { lat: 29.0588, lng: 76.0856 },
    districts: [
      { name: "Karnal", nameHi: "करनाल", nameMr: "कर्नाल", lat: 29.6857, lng: 76.9905 },
      { name: "Hisar", nameHi: "हिसार", nameMr: "हिसार", lat: 29.1492, lng: 75.7217 },
      { name: "Rohtak", nameHi: "रोहतक", nameMr: "रोहतक", lat: 28.8955, lng: 76.6066 },
      { name: "Ambala", nameHi: "अंबाला", nameMr: "अंबाला", lat: 30.3782, lng: 76.7767 },
      { name: "Sirsa", nameHi: "सिरसा", nameMr: "सिरसा", lat: 29.5349, lng: 75.0289 },
      { name: "Kurukshetra", nameHi: "कुरुक्षेत्र", nameMr: "कुरुक्षेत्र", lat: 29.9695, lng: 76.8783 }
    ]
  },
  {
    name: "Uttar Pradesh",
    nameHi: "उत्तर प्रदेश",
    nameMr: "उत्तर प्रदेश",
    center: { lat: 26.8467, lng: 80.9462 },
    districts: [
      { name: "Varanasi", nameHi: "वाराणसी", nameMr: "वाराणसी", lat: 25.3176, lng: 82.9739 },
      { name: "Lucknow", nameHi: "लखनऊ", nameMr: "लखनौ", lat: 26.8467, lng: 80.9462 },
      { name: "Kanpur", nameHi: "कानपुर", nameMr: "कानपूर", lat: 26.4499, lng: 80.3319 },
      { name: "Agra", nameHi: "आगरा", nameMr: "आग्रा", lat: 27.1767, lng: 78.0081 },
      { name: "Prayagraj", nameHi: "प्रयागराज", nameMr: "प्रयागराज", lat: 25.4358, lng: 81.8463 },
      { name: "Gorakhpur", nameHi: "गोरखपुर", nameMr: "गोरखपूर", lat: 26.7606, lng: 83.3732 },
      { name: "Meerut", nameHi: "मेरठ", nameMr: "मेरठ", lat: 28.9845, lng: 77.7064 },
      { name: "Bareilly", nameHi: "बरेली", nameMr: "बरेली", lat: 28.3670, lng: 79.4304 }
    ]
  },
  {
    name: "Rajasthan",
    nameHi: "राजस्थान",
    nameMr: "राजस्थान",
    center: { lat: 27.0238, lng: 74.2179 },
    districts: [
      { name: "Jaipur", nameHi: "जयपुर", nameMr: "जयपूर", lat: 26.9124, lng: 75.7873 },
      { name: "Jodhpur", nameHi: "जोधपुर", nameMr: "जोधपूर", lat: 26.2389, lng: 73.0243 },
      { name: "Kota", nameHi: "कोटा", nameMr: "कोटा", lat: 25.2138, lng: 75.8648 },
      { name: "Bikaner", nameHi: "बीकानेर", nameMr: "बिकानेर", lat: 28.0229, lng: 73.3119 },
      { name: "Udaipur", nameHi: "उदयपुर", nameMr: "उदयपूर", lat: 24.5854, lng: 73.7125 },
      { name: "Sri Ganganagar", nameHi: "श्रीगंगानगर", nameMr: "श्रीगंगानगर", lat: 29.9038, lng: 73.8772 }
    ]
  },
  {
    name: "Karnataka",
    nameHi: "कर्नाटक",
    nameMr: "कर्नाटक",
    center: { lat: 15.3173, lng: 75.7139 },
    districts: [
      { name: "Bengaluru", nameHi: "बेंगलुरु", nameMr: "बंगळुरू", lat: 12.9716, lng: 77.5946 },
      { name: "Mysuru", nameHi: "मैसूरु", nameMr: "म्हैसूर", lat: 12.2958, lng: 76.6394 },
      { name: "Belagavi", nameHi: "बेलगावी", nameMr: "बेळगाव", lat: 15.8497, lng: 74.4977 },
      { name: "Dharwad", nameHi: "धारवाड़", nameMr: "धारवाड", lat: 15.4589, lng: 75.0078 },
      { name: "Kalaburagi", nameHi: "कलबुर्गी", nameMr: "गुलबर्गा", lat: 17.3297, lng: 76.8343 },
      { name: "Shivamogga", nameHi: "शिवमोग्गा", nameMr: "शिमोगा", lat: 13.9299, lng: 75.5681 }
    ]
  },
  {
    name: "Telangana",
    nameHi: "तेलंगाना",
    nameMr: "तेलंगणा",
    center: { lat: 18.1124, lng: 79.0193 },
    districts: [
      { name: "Hyderabad", nameHi: "हैदराबाद", nameMr: "हैदराबाद", lat: 17.3850, lng: 78.4867 },
      { name: "Warangal", nameHi: "वारंगल", nameMr: "वारंगळ", lat: 17.9689, lng: 79.5941 },
      { name: "Karimnagar", nameHi: "करीमनगर", nameMr: "करीमनगर", lat: 18.4386, lng: 79.1288 },
      { name: "Nizamabad", nameHi: "निजामाबाद", nameMr: "निझामाबाद", lat: 18.6725, lng: 78.0941 },
      { name: "Khammam", nameHi: "खम्मम", nameMr: "खम्मम", lat: 17.2473, lng: 80.1514 }
    ]
  },
  {
    name: "Andhra Pradesh",
    nameHi: "आंध्र प्रदेश",
    nameMr: "आंध्र प्रदेश",
    center: { lat: 15.9129, lng: 79.7400 },
    districts: [
      { name: "Guntur", nameHi: "गुंटूर", nameMr: "गुंटूर", lat: 16.3067, lng: 80.4365 },
      { name: "Vijayawada", nameHi: "विजयवाड़ा", nameMr: "विजयवाडा", lat: 16.5062, lng: 80.6480 },
      { name: "Visakhapatnam", nameHi: "विशाखापट्टनम", nameMr: "विशाखापट्टणम", lat: 17.6868, lng: 83.2185 },
      { name: "Kurnool", nameHi: "कर्नूल", nameMr: "कुर्नूल", lat: 15.8281, lng: 78.0373 },
      { name: "Anantapur", nameHi: "अनंतपुर", nameMr: "अनंतपूर", lat: 14.6819, lng: 77.6006 }
    ]
  },
  {
    name: "Tamil Nadu",
    nameHi: "तमिलनाडु",
    nameMr: "तमिळनाडू",
    center: { lat: 11.1271, lng: 78.6569 },
    districts: [
      { name: "Coimbatore", nameHi: "कोयंबटूर", nameMr: "कोइम्बतूर", lat: 11.0168, lng: 76.9558 },
      { name: "Madurai", nameHi: "मदुरै", nameMr: "मदुराई", lat: 9.9252, lng: 78.1198 },
      { name: "Thanjavur", nameHi: "तंजावुर", nameMr: "तंजावर", lat: 10.7870, lng: 79.1378 },
      { name: "Salem", nameHi: "सेलम", nameMr: "सेलम", lat: 11.6643, lng: 78.1460 },
      { name: "Tiruchirappalli", nameHi: "तिरुचिरापल्ली", nameMr: "तिरुचिरापल्ली", lat: 10.7905, lng: 78.7047 }
    ]
  },
  {
    name: "Bihar",
    nameHi: "बिहार",
    nameMr: "बिहार",
    center: { lat: 25.0961, lng: 85.3131 },
    districts: [
      { name: "Patna", nameHi: "पटना", nameMr: "पाटणा", lat: 25.5941, lng: 85.1376 },
      { name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", nameMr: "मुझफ्फरपूर", lat: 26.1209, lng: 85.3647 },
      { name: "Bhagalpur", nameHi: "भागलपुर", nameMr: "भागलपूर", lat: 25.2425, lng: 86.9842 },
      { name: "Gaya", nameHi: "गया", nameMr: "गया", lat: 24.7914, lng: 85.0002 },
      { name: "Samastipur", nameHi: "समस्तीपुर", nameMr: "समस्तीपूर", lat: 25.8628, lng: 85.7811 }
    ]
  },
  {
    name: "West Bengal",
    nameHi: "पश्चिम बंगाल",
    nameMr: "पश्चिम बंगाल",
    center: { lat: 22.9868, lng: 87.8550 },
    districts: [
      { name: "Kolkata", nameHi: "कोलकाता", nameMr: "कोलकाता", lat: 22.5726, lng: 88.3639 },
      { name: "Burdwan", nameHi: "बर्दवान", nameMr: "बर्धमान", lat: 23.2324, lng: 87.8615 },
      { name: "Murshidabad", nameHi: "मुर्शिदाबाद", nameMr: "मुर्शिदाबाद", lat: 24.1837, lng: 88.2716 },
      { name: "Hooghly", nameHi: "हुगली", nameMr: "हुगळी", lat: 22.9034, lng: 88.3965 },
      { name: "Nadia", nameHi: "नादिया", nameMr: "नदिया", lat: 23.4710, lng: 88.5565 }
    ]
  },
  {
    name: "Odisha",
    nameHi: "ओडिशा",
    nameMr: "ओडिशा",
    center: { lat: 20.9517, lng: 85.0985 },
    districts: [
      { name: "Bhubaneswar", nameHi: "भुवनेश्वर", nameMr: "भुवनेश्वर", lat: 20.2961, lng: 85.8245 },
      { name: "Cuttack", nameHi: "कटक", nameMr: "कटक", lat: 20.4625, lng: 85.8828 },
      { name: "Sambalpur", nameHi: "संबलपुर", nameMr: "संबलपूर", lat: 21.4669, lng: 83.9812 },
      { name: "Balasore", nameHi: "बालेश्वर", nameMr: "बालेश्वर", lat: 21.4934, lng: 86.9135 }
    ]
  },
  {
    name: "Kerala",
    nameHi: "केरल",
    nameMr: "केरळ",
    center: { lat: 10.8505, lng: 76.2711 },
    districts: [
      { name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", nameMr: "तिरुवनंतपुरम", lat: 8.5241, lng: 76.9366 },
      { name: "Kochi", nameHi: "कोच्चि", nameMr: "कोची", lat: 9.9312, lng: 76.2673 },
      { name: "Palakkad", nameHi: "पालक्काड़", nameMr: "पालक्काड", lat: 10.7867, lng: 76.6548 },
      { name: "Wayanad", nameHi: "वायनाड", nameMr: "वायनाड", lat: 11.6854, lng: 76.1320 }
    ]
  }
];

export const getAllStates = (): string[] => {
  return INDIA_STATES_DATA.map(s => s.name);
};

export const getStateInfo = (stateName: string): StateInfo => {
  return INDIA_STATES_DATA.find(s => s.name.toLowerCase() === stateName.toLowerCase()) || INDIA_STATES_DATA[0];
};

export const getDistrictsForState = (stateName: string): DistrictInfo[] => {
  const st = getStateInfo(stateName);
  return st.districts;
};

export const getDistrictCoordinates = (stateName: string, districtName: string): { lat: number; lng: number } => {
  const st = getStateInfo(stateName);
  const dist = st.districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
  if (dist) {
    return { lat: dist.lat, lng: dist.lng };
  }
  return st.center;
};

