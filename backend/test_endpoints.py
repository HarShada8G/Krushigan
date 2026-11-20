from app.main import root, health_check
from app.routers.farmer import get_profile
from app.routers.weather import get_current_weather
from app.routers.officer import get_dashboard_summary, get_hotspots
from app.routers.reports import analyze_crop
from app.models.schemas import AnalyzeRequest

def run_tests():
    print("Testing root endpoint...")
    r = root()
    assert r["app"] == "Krushigan API"
    # team field removed in rebrand
    print("??? root passed:", r["tagline"])

    print("Testing health check...")
    h = health_check()
    assert h["status"] == "healthy"
    print("??? health passed")

    print("Testing farmer profile...")
    prof = get_profile()
    assert prof.district == "Akola"
    print("??? profile passed:", prof.name)

    print("Testing weather...")
    w = get_current_weather("Akola")
    assert w.district == "Akola"
    print(f"??? weather passed: {w.temperature}??C, {w.humidity}% humidity")

    print("Testing AI analysis...")
    diag = analyze_crop(AnalyzeRequest(image_data="demo_data", crop="Tomato", growth_stage="Flowering"))
    assert diag.crop == "Tomato"
    assert len(diag.recommendations.green.items) > 0
    print("??? AI analysis passed:", diag.detectedProblem)

    print("Testing officer dashboard & hotspots...")
    dash = get_dashboard_summary()
    assert dash["stats"]["totalReports"] == 1420
    spots = get_hotspots()
    assert len(spots) >= 5
    print(f"??? officer passed: {len(spots)} hotspots loaded successfully")

    print("\nALL 6 BACKEND ROUTE TESTS PASSED 100%!")

if __name__ == "__main__":
    run_tests()

