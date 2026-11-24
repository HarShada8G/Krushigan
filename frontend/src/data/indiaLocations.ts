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
  // 1. Maharashtra
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
      { name: "Nanded", nameHi: "नांदेड़", nameMr: "नांदेड", lat: 19.1383, lng: 77.3210 },
      { name: "Ahmednagar", nameHi: "अहमदनगर", nameMr: "अहमदनगर", lat: 19.0948, lng: 74.7480 },
      { name: "Chandrapur", nameHi: "चंद्रपुर", nameMr: "चंद्रपूर", lat: 19.9615, lng: 79.2961 },
      { name: "Beed", nameHi: "बीड", nameMr: "बीड", lat: 18.9891, lng: 75.7601 }
    ]
  },
  // 2. Andhra Pradesh
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
      { name: "Anantapur", nameHi: "अनंतपुर", nameMr: "अनंतपूर", lat: 14.6819, lng: 77.6006 },
      { name: "East Godavari", nameHi: "पूर्वी गोदावरी", nameMr: "पूर्व गोदावरी", lat: 17.0005, lng: 81.8040 },
      { name: "West Godavari", nameHi: "पश्चिम गोदावरी", nameMr: "पश्चिम गोदावरी", lat: 16.7107, lng: 81.0952 },
      { name: "Chittoor", nameHi: "चित्तूर", nameMr: "चित्तूर", lat: 13.2172, lng: 79.1003 }
    ]
  },
  // 3. Arunachal Pradesh
  {
    name: "Arunachal Pradesh",
    nameHi: "अरुणाचल प्रदेश",
    nameMr: "अरुणाचल प्रदेश",
    center: { lat: 28.2180, lng: 94.7278 },
    districts: [
      { name: "Itanagar", nameHi: "ईटानगर", nameMr: "इटानगर", lat: 27.0844, lng: 93.6053 },
      { name: "Pasighat", nameHi: "पासीघाट", nameMr: "पासीघाट", lat: 28.0664, lng: 95.3268 },
      { name: "Tawang", nameHi: "तवांग", nameMr: "तवांग", lat: 27.5861, lng: 91.8594 },
      { name: "Ziro", nameHi: "ज़ीरो", nameMr: "झिरो", lat: 27.5380, lng: 93.8344 }
    ]
  },
  // 4. Assam
  {
    name: "Assam",
    nameHi: "असम",
    nameMr: "आसाम",
    center: { lat: 26.2006, lng: 92.9376 },
    districts: [
      { name: "Guwahati", nameHi: "गुवाहाटी", nameMr: "गुवाहाटी", lat: 26.1445, lng: 91.7362 },
      { name: "Dibrugarh", nameHi: "डिब्रूगढ़", nameMr: "दिब्रुगड", lat: 27.4728, lng: 94.9120 },
      { name: "Jorhat", nameHi: "जोरहाट", nameMr: "जोरहाट", lat: 26.7509, lng: 94.2037 },
      { name: "Silchar", nameHi: "सिलचर", nameMr: "सिलचर", lat: 24.8333, lng: 92.7789 },
      { name: "Tezpur", nameHi: "तेजपुर", nameMr: "तेजपूर", lat: 26.6528, lng: 92.7926 },
      { name: "Nagaon", nameHi: "नगांव", nameMr: "नागाव", lat: 26.3464, lng: 92.6840 }
    ]
  },
  // 5. Bihar
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
      { name: "Samastipur", nameHi: "समस्तीपुर", nameMr: "समस्तीपूर", lat: 25.8628, lng: 85.7811 },
      { name: "Darbhanga", nameHi: "दरभंगा", nameMr: "दरभंगा", lat: 26.1542, lng: 85.8918 },
      { name: "Purnia", nameHi: "पूर्णिया", nameMr: "पूर्णिया", lat: 25.7771, lng: 87.4753 },
      { name: "Rohtas", nameHi: "रोहतास", nameMr: "रोहतास", lat: 24.9547, lng: 84.0156 }
    ]
  },
  // 6. Chhattisgarh
  {
    name: "Chhattisgarh",
    nameHi: "छत्तीसगढ़",
    nameMr: "छत्तीसगड",
    center: { lat: 21.2787, lng: 81.8661 },
    districts: [
      { name: "Raipur", nameHi: "रायपुर", nameMr: "रायपूर", lat: 21.2514, lng: 81.6296 },
      { name: "Bilaspur", nameHi: "बिलासपुर", nameMr: "बिलासपूर", lat: 22.0797, lng: 82.1409 },
      { name: "Durg", nameHi: "दुर्ग", nameMr: "दुर्ग", lat: 21.1904, lng: 81.2849 },
      { name: "Rajnandgaon", nameHi: "राजनंदगांव", nameMr: "राजनंदगाव", lat: 21.0971, lng: 81.0375 },
      { name: "Jagdalpur", nameHi: "जगदलपुर", nameMr: "जगदलपूर", lat: 19.0732, lng: 82.0289 },
      { name: "Ambikapur", nameHi: "अंबिकापुर", nameMr: "अंबिकापूर", lat: 23.1189, lng: 83.1979 }
    ]
  },
  // 7. Goa
  {
    name: "Goa",
    nameHi: "गोवा",
    nameMr: "गोवा",
    center: { lat: 15.2993, lng: 74.1240 },
    districts: [
      { name: "North Goa", nameHi: "उत्तर गोवा", nameMr: "उत्तर गोवा", lat: 15.5494, lng: 73.8111 },
      { name: "South Goa", nameHi: "दक्षिण गोवा", nameMr: "दक्षिण गोवा", lat: 15.2736, lng: 74.0435 },
      { name: "Panaji", nameHi: "पणजी", nameMr: "पणजी", lat: 15.4909, lng: 73.8278 },
      { name: "Margao", nameHi: "मडगांव", nameMr: "मडगाव", lat: 15.2832, lng: 73.9862 }
    ]
  },
  // 8. Gujarat
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
      { name: "Mehsana", nameHi: "मेहसाणा", nameMr: "मेहसाणा", lat: 23.5880, lng: 72.3693 },
      { name: "Kutch", nameHi: "कच्छ", nameMr: "कच्छ", lat: 23.7337, lng: 69.8597 },
      { name: "Banaskantha", nameHi: "बनासकांठा", nameMr: "बनासकांठा", lat: 24.1724, lng: 72.4346 }
    ]
  },
  // 9. Haryana
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
      { name: "Kurukshetra", nameHi: "कुरुक्षेत्र", nameMr: "कुरुक्षेत्र", lat: 29.9695, lng: 76.8783 },
      { name: "Sonipat", nameHi: "सोनीपत", nameMr: "सोनिपत", lat: 28.9931, lng: 77.0151 },
      { name: "Panipat", nameHi: "पानीपत", nameMr: "पानिपत", lat: 29.3909, lng: 76.9635 }
    ]
  },
  // 10. Himachal Pradesh
  {
    name: "Himachal Pradesh",
    nameHi: "हिमाचल प्रदेश",
    nameMr: "हिमाचल प्रदेश",
    center: { lat: 31.1048, lng: 77.1734 },
    districts: [
      { name: "Shimla", nameHi: "शिमला", nameMr: "शिमला", lat: 31.1048, lng: 77.1734 },
      { name: "Kangra", nameHi: "कांगड़ा", nameMr: "कांगडा", lat: 32.0998, lng: 76.2691 },
      { name: "Mandi", nameHi: "मंडी", nameMr: "मंडी", lat: 31.7087, lng: 76.9320 },
      { name: "Kullu", nameHi: "कुल्लू", nameMr: "कुलू", lat: 31.9579, lng: 77.1095 },
      { name: "Solan", nameHi: "सोलन", nameMr: "सोलन", lat: 30.9084, lng: 77.0999 },
      { name: "Una", nameHi: "ऊना", nameMr: "उना", lat: 31.4685, lng: 76.2708 }
    ]
  },
  // 11. Jharkhand
  {
    name: "Jharkhand",
    nameHi: "झारखंड",
    nameMr: "झारखंड",
    center: { lat: 23.6102, lng: 85.2799 },
    districts: [
      { name: "Ranchi", nameHi: "रांची", nameMr: "रांची", lat: 23.3441, lng: 85.3096 },
      { name: "Jamshedpur", nameHi: "जमशेदपुर", nameMr: "जमशेदपूर", lat: 22.8046, lng: 86.2029 },
      { name: "Dhanbad", nameHi: "धनबाद", nameMr: "धनबाद", lat: 23.7957, lng: 86.4304 },
      { name: "Bokaro", nameHi: "बोकारो", nameMr: "बोकारो", lat: 23.6693, lng: 86.1511 },
      { name: "Hazaribagh", nameHi: "हजारीबाग", nameMr: "हजारीबाग", lat: 23.9925, lng: 85.3637 },
      { name: "Deoghar", nameHi: "देवघर", nameMr: "देवघर", lat: 24.4826, lng: 86.7001 }
    ]
  },
  // 12. Karnataka
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
      { name: "Shivamogga", nameHi: "शिवमोग्गा", nameMr: "शिमोगा", lat: 13.9299, lng: 75.5681 },
      { name: "Vijayapura", nameHi: "विजयपुर", nameMr: "विजापूर", lat: 16.8302, lng: 75.7100 },
      { name: "Ballari", nameHi: "बल्लारी", nameMr: "बेल्लारी", lat: 15.1394, lng: 76.9214 }
    ]
  },
  // 13. Kerala
  {
    name: "Kerala",
    nameHi: "केरल",
    nameMr: "केरळ",
    center: { lat: 10.8505, lng: 76.2711 },
    districts: [
      { name: "Thiruvananthapuram", nameHi: "तिरुवनंतपुरम", nameMr: "तिरुवनंतपुरम", lat: 8.5241, lng: 76.9366 },
      { name: "Kochi", nameHi: "कोच्चि", nameMr: "कोची", lat: 9.9312, lng: 76.2673 },
      { name: "Palakkad", nameHi: "पालक्काड़", nameMr: "पालक्काड", lat: 10.7867, lng: 76.6548 },
      { name: "Wayanad", nameHi: "वायनाड", nameMr: "वायनाड", lat: 11.6854, lng: 76.1320 },
      { name: "Kozhikode", nameHi: "कोझिकोड", nameMr: "कोझिकोड", lat: 11.2588, lng: 75.7804 },
      { name: "Thrissur", nameHi: "त्रिशूर", nameMr: "त्रिशूर", lat: 10.5276, lng: 76.2144 },
      { name: "Kottayam", nameHi: "कोट्टायम", nameMr: "कोट्टायम", lat: 9.5916, lng: 76.5222 }
    ]
  },
  // 14. Madhya Pradesh
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
      { name: "Dewas", nameHi: "देवास", nameMr: "देवास", lat: 22.9676, lng: 76.0534 },
      { name: "Sagar", nameHi: "सागर", nameMr: "सागर", lat: 23.8388, lng: 78.7378 },
      { name: "Ratlam", nameHi: "रतलाम", nameMr: "रतलाम", lat: 23.3315, lng: 75.0367 }
    ]
  },
  // 15. Manipur
  {
    name: "Manipur",
    nameHi: "मणिपुर",
    nameMr: "मणिपूर",
    center: { lat: 24.6637, lng: 93.9063 },
    districts: [
      { name: "Imphal", nameHi: "इम्फाल", nameMr: "इम्फाळ", lat: 24.8170, lng: 93.9368 },
      { name: "Churachandpur", nameHi: "चुराचांदपुर", nameMr: "चुराचांदपूर", lat: 24.3333, lng: 93.6833 },
      { name: "Thoubal", nameHi: "थौबल", nameMr: "थौबल", lat: 24.6333, lng: 93.9999 },
      { name: "Bishnupur", nameHi: "बिष्णुपुर", nameMr: "बिष्णुपूर", lat: 24.6333, lng: 93.7667 }
    ]
  },
  // 16. Meghalaya
  {
    name: "Meghalaya",
    nameHi: "मेघालय",
    nameMr: "मेघालय",
    center: { lat: 25.4670, lng: 91.3662 },
    districts: [
      { name: "Shillong", nameHi: "शिलांग", nameMr: "शिलाँग", lat: 25.5788, lng: 91.8933 },
      { name: "Tura", nameHi: "तुरा", nameMr: "तुरा", lat: 25.5142, lng: 90.2033 },
      { name: "Jowai", nameHi: "जोवाई", nameMr: "जोवाई", lat: 25.4500, lng: 92.2000 },
      { name: "Nongstoin", nameHi: "नोंगस्टोइन", nameMr: "नोंगस्टॉइन", lat: 25.5167, lng: 91.2667 }
    ]
  },
  // 17. Mizoram
  {
    name: "Mizoram",
    nameHi: "मिजोरम",
    nameMr: "मिझोराम",
    center: { lat: 23.1645, lng: 92.9376 },
    districts: [
      { name: "Aizawl", nameHi: "आइज़ोल", nameMr: "ऐझॉल", lat: 23.7271, lng: 92.7176 },
      { name: "Lunglei", nameHi: "लुंगलेई", nameMr: "लुंगलेई", lat: 22.8671, lng: 92.7656 },
      { name: "Champhai", nameHi: "चम्फाई", nameMr: "चम्फाई", lat: 23.4750, lng: 93.3283 },
      { name: "Kolasib", nameHi: "कोलासिब", nameMr: "कोलासिब", lat: 24.2300, lng: 92.6800 }
    ]
  },
  // 18. Nagaland
  {
    name: "Nagaland",
    nameHi: "नागालैंड",
    nameMr: "नागालँड",
    center: { lat: 26.1584, lng: 94.5624 },
    districts: [
      { name: "Kohima", nameHi: "कोहिमा", nameMr: "कोहिमा", lat: 25.6751, lng: 94.1086 },
      { name: "Dimapur", nameHi: "दीमापुर", nameMr: "दिमापूर", lat: 25.9068, lng: 93.7273 },
      { name: "Mokokchung", nameHi: "मोकोकचुंग", nameMr: "मोकोकचुंग", lat: 26.3256, lng: 94.5203 },
      { name: "Wokha", nameHi: "वोखा", nameMr: "वोखा", lat: 26.1000, lng: 94.2667 }
    ]
  },
  // 19. Odisha
  {
    name: "Odisha",
    nameHi: "ओडिशा",
    nameMr: "ओडिशा",
    center: { lat: 20.9517, lng: 85.0985 },
    districts: [
      { name: "Bhubaneswar", nameHi: "भुवनेश्वर", nameMr: "भुवनेश्वर", lat: 20.2961, lng: 85.8245 },
      { name: "Cuttack", nameHi: "कटक", nameMr: "कटक", lat: 20.4625, lng: 85.8828 },
      { name: "Sambalpur", nameHi: "संबलपुर", nameMr: "संबलपूर", lat: 21.4669, lng: 83.9812 },
      { name: "Balasore", nameHi: "बालेश्वर", nameMr: "बालेश्वर", lat: 21.4934, lng: 86.9135 },
      { name: "Berhampur", nameHi: "ब्रह्मपुर", nameMr: "बेरहामपूर", lat: 19.3150, lng: 84.7941 },
      { name: "Puri", nameHi: "पुरी", nameMr: "पुरी", lat: 19.8135, lng: 85.8312 },
      { name: "Bargarh", nameHi: "बरगढ़", nameMr: "बारगड", lat: 21.3333, lng: 83.6167 }
    ]
  },
  // 20. Punjab
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
      { name: "Firozpur", nameHi: "फिरोजपुर", nameMr: "फिरोजपूर", lat: 30.9237, lng: 74.6138 },
      { name: "Hoshiarpur", nameHi: "होशियारपुर", nameMr: "होशियारपूर", lat: 31.5273, lng: 75.9142 }
    ]
  },
  // 21. Rajasthan
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
      { name: "Sri Ganganagar", nameHi: "श्रीगंगानगर", nameMr: "श्रीगंगानगर", lat: 29.9038, lng: 73.8772 },
      { name: "Ajmer", nameHi: "अजमेर", nameMr: "अजमेर", lat: 26.4499, lng: 74.6399 },
      { name: "Alwar", nameHi: "अलवर", nameMr: "अलवर", lat: 27.5530, lng: 76.6346 }
    ]
  },
  // 22. Sikkim
  {
    name: "Sikkim",
    nameHi: "सिक्किम",
    nameMr: "सिक्कीम",
    center: { lat: 27.5330, lng: 88.5122 },
    districts: [
      { name: "Gangtok", nameHi: "गंगटोक", nameMr: "गंगटोक", lat: 27.3389, lng: 88.6065 },
      { name: "Namchi", nameHi: "नामची", nameMr: "नामची", lat: 27.1667, lng: 88.3500 },
      { name: "Geyzing", nameHi: "गेजिंग", nameMr: "गेयझिंग", lat: 27.2833, lng: 88.2500 },
      { name: "Mangan", nameHi: "मंगन", nameMr: "मंगन", lat: 27.5167, lng: 88.5333 }
    ]
  },
  // 23. Tamil Nadu
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
      { name: "Tiruchirappalli", nameHi: "तिरुचिरापल्ली", nameMr: "तिरुचिरापल्ली", lat: 10.7905, lng: 78.7047 },
      { name: "Chennai", nameHi: "चेन्नई", nameMr: "चेन्नई", lat: 13.0827, lng: 80.2707 },
      { name: "Tirunelveli", nameHi: "तिरुनेलवेली", nameMr: "तिरुनेलवेली", lat: 8.7139, lng: 77.7567 },
      { name: "Erode", nameHi: "इरोड", nameMr: "इरोड", lat: 11.3410, lng: 77.7172 }
    ]
  },
  // 24. Telangana
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
      { name: "Khammam", nameHi: "खम्मम", nameMr: "खम्मम", lat: 17.2473, lng: 80.1514 },
      { name: "Nalgonda", nameHi: "नलगोंडा", nameMr: "नलगोंडा", lat: 17.0575, lng: 79.2684 },
      { name: "Mahbubnagar", nameHi: "महबूबनगर", nameMr: "महबूबनगर", lat: 16.7433, lng: 77.9856 }
    ]
  },
  // 25. Tripura
  {
    name: "Tripura",
    nameHi: "त्रिपुरा",
    nameMr: "त्रिपुरा",
    center: { lat: 23.9408, lng: 91.9882 },
    districts: [
      { name: "Agartala", nameHi: "अगरतला", nameMr: "अगरतळा", lat: 23.8315, lng: 91.2868 },
      { name: "Dharmanagar", nameHi: "धर्मनगर", nameMr: "धर्मनगर", lat: 24.3833, lng: 92.1667 },
      { name: "Udaipur", nameHi: "उदयपुर", nameMr: "उदयपूर", lat: 23.5333, lng: 91.4833 },
      { name: "Kailashahar", nameHi: "कैलाशहर", nameMr: "कैलाशहर", lat: 24.3320, lng: 92.0080 }
    ]
  },
  // 26. Uttar Pradesh
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
      { name: "Bareilly", nameHi: "बरेली", nameMr: "बरेली", lat: 28.3670, lng: 79.4304 },
      { name: "Aligarh", nameHi: "अलीगढ़", nameMr: "अलिगड", lat: 27.8974, lng: 78.0880 },
      { name: "Ayodhya", nameHi: "अयोध्या", nameMr: "अयोध्या", lat: 26.7922, lng: 82.1998 }
    ]
  },
  // 27. Uttarakhand
  {
    name: "Uttarakhand",
    nameHi: "उत्तराखंड",
    nameMr: "उत्तराखंड",
    center: { lat: 30.0668, lng: 79.0193 },
    districts: [
      { name: "Dehradun", nameHi: "देहरादून", nameMr: "डेहराडून", lat: 30.3165, lng: 78.0322 },
      { name: "Haridwar", nameHi: "हरिद्वार", nameMr: "हरिद्वार", lat: 29.9457, lng: 78.1642 },
      { name: "Nainital", nameHi: "नैनीताल", nameMr: "नैनिताल", lat: 29.3919, lng: 79.4542 },
      { name: "Udham Singh Nagar", nameHi: "ऊधम सिंह नगर", nameMr: "उधम सिंह नगर", lat: 28.9800, lng: 79.4000 },
      { name: "Almora", nameHi: "अल्मोड़ा", nameMr: "अल्मोडा", lat: 29.5971, lng: 79.6591 }
    ]
  },
  // 28. West Bengal
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
      { name: "Nadia", nameHi: "नादिया", nameMr: "नदिया", lat: 23.4710, lng: 88.5565 },
      { name: "Jalpaiguri", nameHi: "जलपाईगुड़ी", nameMr: "जलपाईगुडी", lat: 26.5400, lng: 88.7200 },
      { name: "Malda", nameHi: "मालदा", nameMr: "माल्दा", lat: 25.0108, lng: 88.1411 }
    ]
  },

  // ---------------- UNION TERRITORIES (8) ----------------
  // 29. Andaman and Nicobar Islands
  {
    name: "Andaman and Nicobar Islands",
    nameHi: "अंडमान और निकोबार द्वीप समूह",
    nameMr: "अंदमान आणि निकोबार",
    center: { lat: 11.7401, lng: 92.6586 },
    districts: [
      { name: "Port Blair", nameHi: "पोर्ट ब्लेयर", nameMr: "पोर्ट ब्लेअर", lat: 11.6234, lng: 92.7265 },
      { name: "Car Nicobar", nameHi: "कार निकोबार", nameMr: "कार निकोबार", lat: 9.1549, lng: 92.7626 },
      { name: "Mayabunder", nameHi: "मायाबंदर", nameMr: "मायाबंदर", lat: 12.9300, lng: 92.9300 }
    ]
  },
  // 30. Chandigarh
  {
    name: "Chandigarh",
    nameHi: "चंडीगढ़",
    nameMr: "चंदिगढ",
    center: { lat: 30.7333, lng: 76.7794 },
    districts: [
      { name: "Chandigarh", nameHi: "चंडीगढ़", nameMr: "चंदिगढ", lat: 30.7333, lng: 76.7794 }
    ]
  },
  // 31. Dadra and Nagar Haveli and Daman and Diu
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    nameHi: "दादरा और नगर हवेली एवं दमन और दीव",
    nameMr: "दादरा व नगर हवेली आणि दमण व दीव",
    center: { lat: 20.3974, lng: 72.8328 },
    districts: [
      { name: "Daman", nameHi: "दमन", nameMr: "दमण", lat: 20.4283, lng: 72.8397 },
      { name: "Diu", nameHi: "दीव", nameMr: "दीव", lat: 20.7144, lng: 70.9874 },
      { name: "Silvassa", nameHi: "सिलवासा", nameMr: "सिलवासा", lat: 20.2763, lng: 73.0083 }
    ]
  },
  // 32. Delhi (NCT)
  {
    name: "Delhi (NCT)",
    nameHi: "दिल्ली (राष्ट्रीय राजधानी क्षेत्र)",
    nameMr: "दिल्ली",
    center: { lat: 28.7041, lng: 77.1025 },
    districts: [
      { name: "New Delhi", nameHi: "नई दिल्ली", nameMr: "नवी दिल्ली", lat: 28.6139, lng: 77.2090 },
      { name: "North Delhi", nameHi: "उत्तर दिल्ली", nameMr: "उत्तर दिल्ली", lat: 28.7500, lng: 77.1500 },
      { name: "South Delhi", nameHi: "दक्षिण दिल्ली", nameMr: "दक्षिण दिल्ली", lat: 28.5000, lng: 77.2000 },
      { name: "West Delhi", nameHi: "पश्चिम दिल्ली", nameMr: "पश्चिम दिल्ली", lat: 28.6500, lng: 77.0500 },
      { name: "East Delhi", nameHi: "पूर्वी दिल्ली", nameMr: "पूर्व दिल्ली", lat: 28.6300, lng: 77.3000 }
    ]
  },
  // 33. Jammu and Kashmir
  {
    name: "Jammu and Kashmir",
    nameHi: "जम्मू और कश्मीर",
    nameMr: "जम्मू आणि काश्मीर",
    center: { lat: 33.7782, lng: 76.5762 },
    districts: [
      { name: "Srinagar", nameHi: "श्रीनगर", nameMr: "श्रीनगर", lat: 34.0837, lng: 74.7973 },
      { name: "Jammu", nameHi: "जम्मू", nameMr: "जम्मू", lat: 32.7266, lng: 74.8570 },
      { name: "Anantnag", nameHi: "अनंतनाग", nameMr: "अनंतनाग", lat: 33.7311, lng: 75.1522 },
      { name: "Baramulla", nameHi: "बारामूला", nameMr: "बारामुल्ला", lat: 34.1980, lng: 74.3636 },
      { name: "Udhampur", nameHi: "उधमपुर", nameMr: "उधमपूर", lat: 32.9250, lng: 75.1417 }
    ]
  },
  // 34. Ladakh
  {
    name: "Ladakh",
    nameHi: "लद्दाख",
    nameMr: "लडाख",
    center: { lat: 34.1526, lng: 77.5771 },
    districts: [
      { name: "Leh", nameHi: "लेह", nameMr: "लेह", lat: 34.1526, lng: 77.5771 },
      { name: "Kargil", nameHi: "कारगिल", nameMr: "कारगील", lat: 34.5539, lng: 76.1349 }
    ]
  },
  // 35. Lakshadweep
  {
    name: "Lakshadweep",
    nameHi: "लक्षद्वीप",
    nameMr: "लक्षद्वीप",
    center: { lat: 10.5667, lng: 72.6417 },
    districts: [
      { name: "Kavaratti", nameHi: "कवरत्ती", nameMr: "कवरत्ती", lat: 10.5667, lng: 72.6417 },
      { name: "Agatti", nameHi: "अगत्ती", nameMr: "अगत्ती", lat: 10.8533, lng: 72.1931 },
      { name: "Andrott", nameHi: "अंद्रोत", nameMr: "अंद्रोत", lat: 10.8167, lng: 73.6667 }
    ]
  },
  // 36. Puducherry
  {
    name: "Puducherry",
    nameHi: "पुदुचेरी",
    nameMr: "पुद्दुचेरी",
    center: { lat: 11.9416, lng: 79.8083 },
    districts: [
      { name: "Puducherry", nameHi: "पुदुचेरी", nameMr: "पुद्दुचेरी", lat: 11.9416, lng: 79.8083 },
      { name: "Karaikal", nameHi: "कराईकल", nameMr: "कारैकाल", lat: 10.9254, lng: 79.8380 },
      { name: "Mahe", nameHi: "माहे", nameMr: "माहे", lat: 11.7002, lng: 75.5340 },
      { name: "Yanam", nameHi: "यानम", nameMr: "यानम", lat: 16.7333, lng: 82.2167 }
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
