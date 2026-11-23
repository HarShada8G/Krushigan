from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional, Dict, Tuple
import httpx
from app.models.schemas import WeatherSchema, ForecastDay

router = APIRouter(prefix="/api/weather", tags=["Weather"])

# Coordinates of major agricultural and reference districts across India
INDIAN_DISTRICT_COORDS: Dict[str, Tuple[float, float, str, str]] = {
    # Maharashtra
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
    
    # Gujarat
    "ahmedabad": (23.0225, 72.5714, "शुष्क व गर्म", "उष्ण व कोरडे"),
    "surat": (21.1702, 72.8311, "तटीय आर्द्रता", "किनारपट्टी दमटपणा"),
    "rajkot": (22.3039, 70.8022, "तेज हवाएं", "वेगवान वारे"),
    
    # Madhya Pradesh
    "indore": (22.7196, 75.8577, "मध्यम तापमान व साफ मौसम", "मध्यम तापमान"),
    "bhopal": (23.2599, 77.4126, "हल्के बादल", "हलके ढग"),
    "ujjain": (23.1765, 75.7885, "धूप खिली रहेगी", "सूर्यप्रकाश"),
    "jabalpur": (23.1815, 79.9864, "आर्द्र मौसम", "दमट हवामान"),
    
    # Punjab & Haryana
    "ludhiana": (30.9010, 75.8573, "ठंडी सुबह व साफ दोपहर", "थंड सकाळ व निरभ्र दुपार"),
    "amritsar": (31.6340, 74.8723, "हल्का कोहरा व धूप", "हलके धुके"),
    "karnal": (29.6857, 76.9905, "गेहूं अनुकूल तापमान", "गहू पोषक हवामान"),
    
    # Uttar Pradesh & Rajasthan
    "varanasi": (25.3176, 82.9739, "गंगा मैदानी आर्द्रता", "दमट हवामान"),
    "lucknow": (26.8467, 80.9462, "साफ धूप", "निरभ्र ऊन"),
    "jaipur": (26.9124, 75.7873, "शुष्क मरुस्थलीय मौसम", "कोरडे हवामान"),
    
    # South India
    "bengaluru": (12.9716, 77.5946, "सुहावनी ठंडक", "ल्हाददायक गारवा"),
    "hyderabad": (17.3850, 78.4867, "आंशिक बादल", "अंशतः ढगाळ"),
    "coimbatore": (11.0168, 76.9558, "पहाड़ी हवाएं", "डोंगराळ वारे"),
    "guntur": (16.3067, 80.4365, "गर्म व उच्च आर्द्रता", "उष्ण व अतिदमट")
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

    # Do not silently default to Akola for an unknown location!
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Weather data unavailable for '{target_name}'. Please select a supported district or provide GPS coordinates."
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
