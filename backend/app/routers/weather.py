from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional, Dict, Tuple
import httpx
from app.models.schemas import WeatherSchema, ForecastDay

router = APIRouter(prefix="/api/weather", tags=["Weather"])

# Coordinates of major agricultural and reference districts across all 28 States and 8 UTs of India
INDIAN_DISTRICT_COORDS: Dict[str, Tuple[float, float, str, str]] = {
    # 1. Maharashtra
    "akola": (20.7002, 77.0082, "आंशिक बादल व उच्च आर्द्रता", "अंशतः ढगाळ व दमट"),
    "amravati": (20.9374, 77.7796, "धूप व बादल", "ऊन आणि ढग"),
    "nagpur": (21.1458, 79.0882, "गर्म व सूखा मौसम", "उष्ण व कोरडे हवामान"),
    "nashik": (19.9975, 73.7898, "लगातार बादल व रिमझिम फुहारें", "सतत ढगाळ व हलका पाऊस"),
    "pune": (18.5204, 73.8567, "सुहावना मौसम", "ल्हाददायक हवामान"),
    "jalgaon": (21.0077, 75.5626, "तेज धूप", "कडक ऊन"),
    "solapur": (17.6599, 75.9064, "शुष्क व गर्म", "कोरडे व उष्ण"),
    "wardha": (20.7453, 78.6022, "हल्के बादल", "हलके ढग"),
    "yavatmal": (20.3888, 78.1204, "उमस व बादल", "दमट व ढगाळ"),
    "buldhana": (20.5293, 76.1843, "साफ आसमान", "निरभ्र आकाश"),
    "washim": (20.1111, 77.1354, "आंशिक धूप", "अंशतः ऊन"),
    "latur": (18.4088, 76.5604, "शुष्क मौसम", "कोरडे हवामान"),
    "kolhapur": (16.7050, 74.2433, "हल्की बारिश की संभावना", "हलक्या पावसाची शक्यता"),
    "satara": (17.6805, 73.9997, "हल्की ठंड व बादल", "हलकी थंडी व ढग"),
    "sangli": (16.8524, 74.5815, "शुष्क धूप", "कोरडे ऊन"),
    "nanded": (19.1383, 77.3210, "हल्की हवाएं", "मंद वारे"),
    "ahmednagar": (19.0948, 74.7480, "साफ मौसम", "निरभ्र हवामान"),
    "chandrapur": (19.9615, 79.2961, "उष्ण हवामान", "उष्ण व दमट"),
    "beed": (18.9891, 75.7601, "शुष्क व स्वच्छ", "कोरडे व निरभ्र"),
    
    # 2. Andhra Pradesh
    "guntur": (16.3067, 80.4365, "गर्म व उच्च आर्द्रता", "उष्ण व अतिदमट"),
    "vijayawada": (16.5062, 80.6480, "तटीय आर्द्रता", "किनारपट्टी दमटपणा"),
    "visakhapatnam": (17.6868, 83.2185, "समुद्री हवाएं व उमस", "सागरी वारे व दमट"),
    "kurnool": (15.8281, 78.0373, "शुष्क व गर्म", "कोरडे व उष्ण"),
    "anantapur": (14.6819, 77.6006, "कम वर्षा व शुष्क", "कमी पाऊस व कोरडे"),

    # 3. Arunachal Pradesh
    "itanagar": (27.0844, 93.6053, "पहाड़ी फुहारें", "डोंगराळ पाऊस"),
    "pasighat": (28.0664, 95.3268, "आर्द्र व बादल", "दमट व ढगाळ"),

    # 4. Assam
    "guwahati": (26.1445, 91.7362, "नदी घाटी आर्द्रता", "नदी खोरे दमट हवामान"),
    "dibrugarh": (27.4728, 94.9120, "चाय बगान अनुकूल मौसम", "चहा मळे पोषक हवामान"),
    "jorhat": (26.7509, 94.2037, "हल्की बारिश", "हलका पाऊस"),

    # 5. Bihar
    "patna": (25.5941, 85.1376, "मैदानी आर्द्रता व धूप", "मैदानी दमटपणा व ऊन"),
    "muzaffarpur": (26.1209, 85.3647, "लीची अनुकूल मौसम", "पोषक हवामान"),
    "bhagalpur": (25.2425, 86.9842, "आंशिक बादल", "अंशतः ढगाळ"),
    "gaya": (24.7914, 85.0002, "शुष्क व गर्म दोपहर", "कोरडी दुपार"),

    # 6. Chhattisgarh
    "raipur": (21.2514, 81.6296, "धान अनुकूल तापमान", "भात पोषक हवामान"),
    "bilaspur": (22.0797, 82.1409, "हल्के बादल", "हलके ढग"),
    "durg": (21.1904, 81.2849, "साफ धूप", "निरभ्र ऊन"),

    # 7. Goa
    "panaji": (15.4909, 73.8278, "तटीय समुद्री हवाएं", "किनारपट्टी सागरी वारे"),
    "north goa": (15.5494, 73.8111, "उमस व सुहावनी हवा", "दमट व अल्हाददायक हवा"),

    # 8. Gujarat
    "ahmedabad": (23.0225, 72.5714, "शुष्क व गर्म", "उष्ण व कोरडे"),
    "surat": (21.1702, 72.8311, "तटीय आर्द्रता", "किनारपट्टी दमटपणा"),
    "rajkot": (22.3039, 70.8022, "तेज हवाएं", "वेगवान वारे"),
    "vadodara": (22.3072, 73.1812, "साफ मौसम", "निरभ्र हवामान"),
    "anand": (22.5645, 72.9289, "अनुकूल कृषि तापमान", "कृषी पोषक तापमान"),

    # 9. Haryana
    "karnal": (29.6857, 76.9905, "गेहूं अनुकूल तापमान", "गहू पोषक हवामान"),
    "hisar": (29.1492, 75.7217, "शुष्क व साफ", "कोरडे व स्वच्छ"),
    "rohtak": (28.8955, 76.6066, "धूप व मध्यम हवा", "ऊन व मध्यम वारा"),
    "ambala": (30.3782, 76.7767, "ठंडी सुबह", "थंड सकाळ"),

    # 10. Himachal Pradesh
    "shimla": (31.1048, 77.1734, "शीतल पहाड़ी मौसम", "थंड डोंगराळ हवामान"),
    "kangra": (32.0998, 76.2691, "स्वच्छ पहाड़ी हवा", "स्वच्छ हवा"),
    "kullu": (31.9579, 77.1095, "सेब बागान अनुकूल मौसम", "सफरचंद पोषक हवामान"),

    # 11. Jharkhand
    "ranchi": (23.3441, 85.3096, "पठारी सुहावना मौसम", "पठारी अल्हाददायक हवामान"),
    "jamshedpur": (22.8046, 86.2029, "मध्यम उमस", "मध्यम दमटपणा"),

    # 12. Karnataka
    "bengaluru": (12.9716, 77.5946, "सुहावनी ठंडक", "ल्हाददायक गारवा"),
    "mysuru": (12.2958, 76.6394, "साफ व सुहावना", "स्वच्छ व अल्हाददायक"),
    "belagavi": (15.8497, 74.4977, "शीतल हवाएं", "थंड वारे"),
    "dharwad": (15.4589, 75.0078, "हल्की बारिश", "हलका पाऊस"),

    # 13. Kerala
    "thiruvananthapuram": (8.5241, 76.9366, "तटीय वर्षा व उमस", "किनारपट्टी पाऊस व दमटपणा"),
    "kochi": (9.9312, 76.2673, "उच्च आर्द्रता व बारिश", "अतिदमट व पाऊस"),
    "wayanad": (11.6854, 76.1320, "पहाड़ी धुंध व ठंडक", "डोंगराळ धुके व गारवा"),

    # 14. Madhya Pradesh
    "indore": (22.7196, 75.8577, "मध्यम तापमान व साफ मौसम", "मध्यम तापमान"),
    "bhopal": (23.2599, 77.4126, "हल्के बादल", "हलके ढग"),
    "ujjain": (23.1765, 75.7885, "धूप खिली रहेगी", "सूर्यप्रकाश"),
    "jabalpur": (23.1815, 79.9864, "आर्द्र मौसम", "दमट हवामान"),
    "gwalior": (26.2183, 78.1828, "तेज धूप", "कडक ऊन"),

    # 15. Manipur, Meghalaya, Mizoram, Nagaland
    "imphal": (24.8170, 93.9368, "घाटी अनुकूल मौसम", "खोरे पोषक हवामान"),
    "shillong": (25.5788, 91.8933, "ठंडी फुहारें व धुंध", "थंड सरी व धुके"),
    "aizawl": (23.7271, 92.7176, "पहाड़ी ठंडक", "डोंगराळ गारवा"),
    "kohima": (25.6751, 94.1086, "शीतल मौसम", "थंड हवामान"),

    # 16. Odisha
    "bhubaneswar": (20.2961, 85.8245, "तटीय आर्द्रता व धूप", "किनारपट्टी दमटपणा"),
    "cuttack": (20.4625, 85.8828, "नदी तटीय मौसम", "नदीकाठचे हवामान"),
    "sambalpur": (21.4669, 83.9812, "गर्म व सूखा", "उष्ण व कोरडे"),

    # 17. Punjab
    "ludhiana": (30.9010, 75.8573, "ठंडी सुबह व साफ दोपहर", "थंड सकाळ व निरभ्र दुपार"),
    "amritsar": (31.6340, 74.8723, "हल्का कोहरा व धूप", "हलके धुके"),
    "jalandhar": (31.3260, 75.5762, "साफ धूप", "निरभ्र ऊन"),
    "patiala": (30.3398, 76.3869, "शुष्क मौसम", "कोरडे हवामान"),

    # 18. Rajasthan
    "jaipur": (26.9124, 75.7873, "शुष्क मरुस्थलीय मौसम", "कोरडे हवामान"),
    "jodhpur": (26.2389, 73.0243, "तेज धूप व सूखा", "कडक ऊन व कोरडे"),
    "kota": (25.2138, 75.8648, "चंबल घाटी धूप", "चंबळ खोरे ऊन"),
    "udaipur": (24.5854, 73.7125, "झीलों की सुहावनी हवा", "अल्हाददायक हवा"),

    # 19. Sikkim & Tripura
    "gangtok": (27.3389, 88.6065, "पहाड़ी कोहरा व शीतलता", "डोंगराळ धुके व थंडी"),
    "agartala": (23.8315, 91.2868, "आर्द्र व धूप", "दमट व ऊन"),

    # 20. Tamil Nadu
    "coimbatore": (11.0168, 76.9558, "पहाड़ी हवाएं", "डोंगराळ वारे"),
    "madurai": (9.9252, 78.1198, "गर्म व शुष्क", "उष्ण व कोरडे"),
    "chennai": (13.0827, 80.2707, "तटीय उमस", "किनारपट्टी दमटपणा"),
    "thanjavur": (10.7870, 79.1378, "कावेरी डेल्टा आर्द्रता", "कावेरी खोरे दमटपणा"),

    # 21. Telangana
    "hyderabad": (17.3850, 78.4867, "आंशिक बादल", "अंशतः ढगाळ"),
    "warangal": (17.9689, 79.5941, "धूप व बादल", "ऊन आणि ढग"),
    "karimnagar": (18.4386, 79.1288, "साफ मौसम", "निरभ्र आकाश"),

    # 22. Uttar Pradesh
    "varanasi": (25.3176, 82.9739, "गंगा मैदानी आर्द्रता", "दमट हवामान"),
    "lucknow": (26.8467, 80.9462, "साफ धूप", "निरभ्र ऊन"),
    "kanpur": (26.4499, 80.3319, "मध्यम हवाएं", "मध्यम वारे"),
    "agra": (27.1767, 78.0081, "शुष्क धूप", "कोरडे ऊन"),

    # 23. Uttarakhand
    "dehradun": (30.3165, 78.0322, "घाटी शीतल मौसम", "खोरे थंड हवामान"),
    "haridwar": (29.9457, 78.1642, "गंगा तटीय सुहावना मौसम", "अल्हाददायक हवामान"),
    "nainital": (29.3919, 79.4542, "पहाड़ी ठंडक व बादल", "डोंगराळ गारवा"),

    # 24. West Bengal
    "kolkata": (22.5726, 88.3639, "डेल्टा आर्द्रता", "त्रिभुज प्रदेश दमटपणा"),
    "burdwan": (23.2324, 87.8615, "धान अनुकूल आर्द्र मौसम", "भात पोषक दमट हवामान"),
    "siliguri": (26.7271, 88.3953, "तराई सुहावना मौसम", "तराई अल्हाददायक हवामान"),

    # Union Territories
    "delhi": (28.7041, 77.1025, "राजधानी मैदानी मौसम", "मैदानी हवामान"),
    "new delhi": (28.6139, 77.2090, "शुष्क व धूप", "कोरडे व ऊन"),
    "chandigarh": (30.7333, 76.7794, "साफ व सुहावना", "स्वच्छ व अल्हाददायक"),
    "srinagar": (34.0837, 74.7973, "कश्मीर घाटी शीतलता", "काश्मीर खोरे थंडी"),
    "jammu": (32.7266, 74.8570, "तवी घाटी मौसम", "खोरे हवामान"),
    "leh": (34.1526, 77.5771, "शीत मरुस्थल ठंडक", "थंड वाळवंट गारवा"),
    "port blair": (11.6234, 92.7265, "समुद्री द्वीप हवाएं व फुहारें", "सागरी द्वीप वारे व पाऊस"),
    "puducherry": (11.9416, 79.8083, "कोरोमंडल तटीय उमस", "किनारपट्टी दमटपणा")
}

def parse_wmo_code(code: int) -> Tuple[str, str, str, str]:
    if code == 0:
        return "Clear Sky", "साफ आसमान", "निरभ्र आकाश", "sun"
    elif code in [1, 2]:
        return "Partly Cloudy", "आंशिक बादल", "अंशतः ढगाळ", "cloud-sun"
    elif code == 3:
        return "Overcast", "घने बादल", "पूर्णतः ढगाळ", "cloud"
    elif code in [45, 48]:
        return "Foggy Spells", "कोहरा व धुंध", "धुके", "cloud"
    elif code in [51, 53, 55, 61, 63, 65, 80, 81]:
        return "Rain Showers", "बारिश / फुहारें", "पावसाची सर", "cloud-rain"
    elif code in [71, 73, 75, 77]:
        return "Hail / Cold Wave", "ओलावृष्टि / शीत लहर", "गारपीट / थंडीची लाट", "cloud-snow"
    elif code in [95, 96, 99]:
        return "Thunderstorms", "तूफानी बारिश व बिजली", "विजांसह वादळी पाऊस", "cloud-lightning"
    else:
        return "Scattered Clouds", "हल्के बादल", "हलके ढग", "cloud-sun"

async def fetch_open_meteo(lat: float, lon: float, district_name: str) -> Optional[WeatherSchema]:
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}&"
        f"current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&"
        f"daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&"
        f"timezone=auto"
    )
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                data = resp.json()
                current = data.get("current", {})
                daily = data.get("daily", {})
                
                temp = float(current.get("temperature_2m", 28.0))
                hum = float(current.get("relative_humidity_2m", 65.0))
                wind = float(current.get("wind_speed_10m", 12.0))
                weather_code = int(current.get("weather_code", 1))
                
                cond_en, cond_hi, cond_mr, icon = parse_wmo_code(weather_code)
                
                forecast = []
                days_label = [("कल (Tomorrow)", 0), ("परसों (Day 2)", 1), ("नरसों (Day 3)", 2)]
                rain_probs = daily.get("precipitation_probability_max", [30, 40, 20])
                temps_max = daily.get("temperature_2m_max", [temp, temp, temp])
                
                for i, (label, idx) in enumerate(days_label):
                    d_code = daily.get("weather_code", [1, 1, 1])[idx] if len(daily.get("weather_code", [])) > idx else 1
                    c_en, _, _, _ = parse_wmo_code(d_code)
                    forecast.append(ForecastDay(
                        day=label,
                        temp=float(temps_max[idx]) if len(temps_max) > idx else temp,
                        humidity=hum,
                        rainProb=float(rain_probs[idx]) if len(rain_probs) > idx else 30.0,
                        condition=c_en
                    ))
                
                return WeatherSchema(
                    district=district_name,
                    temperature=temp,
                    humidity=hum,
                    rainfallProbability=float(rain_probs[0]) if rain_probs else 30.0,
                    windSpeedKmh=wind,
                    condition=cond_en,
                    conditionHi=cond_hi,
                    conditionMr=cond_mr,
                    icon=icon,
                    forecast3Days=forecast,
                    isDemoData=False
                )
    except Exception:
        return None
    return None

@router.get("/current", response_model=WeatherSchema)
async def get_current_weather(
    district: Optional[str] = Query("Akola", description="District Name"),
    lat: Optional[float] = Query(None, description="Latitude"),
    lon: Optional[float] = Query(None, description="Longitude")
):
    target_name = (district or "Akola").strip()
    dist_key = target_name.lower()
    
    # Resolve coordinates if not directly provided
    target_lat = lat
    target_lon = lon
    hi_cond = "मौसम जानकारी उपलब्ध"
    mr_cond = "हवामान माहिती उपलब्ध"

    if (target_lat is None or target_lon is None) and dist_key in INDIAN_DISTRICT_COORDS:
        target_lat, target_lon, hi_cond, mr_cond = INDIAN_DISTRICT_COORDS[dist_key]
    
    # Try fetching real Open-Meteo weather if coordinates exist
    if target_lat is not None and target_lon is not None:
        real_weather = await fetch_open_meteo(target_lat, target_lon, target_name)
        if real_weather:
            return real_weather

    # If coordinates are known from dictionary, provide deterministic localized data
    if dist_key in INDIAN_DISTRICT_COORDS:
        lat_val, lon_val, hi_cond, mr_cond = INDIAN_DISTRICT_COORDS[dist_key]
        # Temperature roughly based on latitude
        base_temp = 32.0 if lat_val < 22 else 27.0
        base_hum = 78.0 if "nashik" in dist_key or "surat" in dist_key else 65.0
        
        return WeatherSchema(
            district=target_name,
            temperature=base_temp,
            humidity=base_hum,
            rainfallProbability=45.0,
            windSpeedKmh=14.0,
            condition="Partly Cloudy with Regional Microclimate",
            conditionHi=hi_cond,
            conditionMr=mr_cond,
            icon="cloud-sun",
            forecast3Days=[
                ForecastDay(day="कल (Tomorrow)", temp=base_temp - 1, humidity=base_hum + 4, rainProb=50, condition="Thunderstorms / Rain"),
                ForecastDay(day="परसों (Day 2)", temp=base_temp - 2, humidity=base_hum + 6, rainProb=65, condition="Cloudy / Moderate Rain"),
                ForecastDay(day="नरसों (Day 3)", temp=base_temp, humidity=base_hum, rainProb=25, condition="Passing Showers")
            ],
            isDemoData=True
        )

    # If location is provided with valid lat/lon, return coordinate-based weather
    if target_lat is not None and target_lon is not None:
        return WeatherSchema(
            district=target_name,
            temperature=28.5,
            humidity=60.0,
            rainfallProbability=30.0,
            windSpeedKmh=12.0,
            condition="Seasonal Weather",
            conditionHi="मौसम अनुकूल",
            conditionMr="हवामान अनुकूल",
            icon="cloud-sun",
            forecast3Days=[
                ForecastDay(day="कल (Tomorrow)", temp=28, humidity=62, rainProb=30, condition="Partly Cloudy"),
                ForecastDay(day="परसों (Day 2)", temp=29, humidity=58, rainProb=20, condition="Sunny"),
                ForecastDay(day="नरसों (Day 3)", temp=28, humidity=65, rainProb=40, condition="Passing Clouds")
            ],
            isDemoData=True
        )

    # Graceful Pan-India fallback for custom villages or unlisted locations
    return WeatherSchema(
        district=target_name,
        temperature=28.0,
        humidity=65.0,
        rainfallProbability=35.0,
        windSpeedKmh=12.0,
        condition="Regional Weather (Pan-India)",
        conditionHi="मौसम अनुकूल व सामान्य",
        conditionMr="हवामान अनुकूल व सामान्य",
        icon="cloud-sun",
        forecast3Days=[
            ForecastDay(day="कल (Tomorrow)", temp=28, humidity=65, rainProb=30, condition="Partly Cloudy"),
            ForecastDay(day="परसों (Day 2)", temp=29, humidity=60, rainProb=25, condition="Sunny / Clear"),
            ForecastDay(day="नरसों (Day 3)", temp=28, humidity=68, rainProb=40, condition="Passing Clouds")
        ],
        isDemoData=True
    )

@router.get("/forecast")
async def get_forecast(
    district: Optional[str] = Query("Akola"),
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None)
):
    weather = await get_current_weather(district=district, lat=lat, lon=lon)
    return {
        "district": weather.district,
        "forecast3Days": weather.forecast3Days,
        "isDemoData": weather.isDemoData
    }
