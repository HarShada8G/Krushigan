from fastapi import APIRouter, Query
from app.models.schemas import WeatherSchema, ForecastDay

router = APIRouter(prefix="/api/weather", tags=["Weather"])

DISTRICT_WEATHER = {
    "Akola": WeatherSchema(
        district="Akola",
        temperature=32.0,
        humidity=78.0,
        rainfallProbability=40.0,
        windSpeedKmh=14.0,
        condition="Partly Cloudy with Humid Spells",
        conditionHi="आंशिक बादल व उच्च आर्द्रता",
        conditionMr="अंशतः ढगाळ व दमट हवामान",
        icon="cloud-sun",
        forecast3Days=[
            ForecastDay(day="कल (Tomorrow)", temp=31, humidity=82, rainProb=60, condition="Thunderstorms"),
            ForecastDay(day="परसों (Day 2)", temp=29, humidity=85, rainProb=75, condition="Cloudy / Moderate Rain"),
            ForecastDay(day="नरसों (Day 3)", temp=30, humidity=74, rainProb=30, condition="Passing Showers")
        ],
        isDemoData=True
    ),
    "Nashik": WeatherSchema(
        district="Nashik",
        temperature=27.5,
        humidity=88.0,
        rainfallProbability=65.0,
        windSpeedKmh=18.0,
        condition="Overcast with Light Mist",
        conditionHi="लगातार बादल व रिमझिम फुहारें",
        conditionMr="सतत ढगाळ व हलका पाऊस",
        icon="cloud-rain",
        forecast3Days=[
            ForecastDay(day="कल (Tomorrow)", temp=26, humidity=90, rainProb=80, condition="Rain"),
            ForecastDay(day="परसों (Day 2)", temp=27, humidity=85, rainProb=70, condition="Rain"),
            ForecastDay(day="नरसों (Day 3)", temp=28, humidity=78, rainProb=40, condition="Cloudy")
        ],
        isDemoData=True
    )
}

@router.get("/current", response_model=WeatherSchema)
def get_current_weather(district: str = Query("Akola", description="Maharashtra District Name")):
    return DISTRICT_WEATHER.get(district, DISTRICT_WEATHER["Akola"])

@router.get("/forecast")
def get_forecast(district: str = Query("Akola")):
    weather = DISTRICT_WEATHER.get(district, DISTRICT_WEATHER["Akola"])
    return {
        "district": weather.district,
        "forecast3Days": weather.forecast3Days,
        "isDemoData": True
    }
