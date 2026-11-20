from fastapi import APIRouter
from app.models.schemas import FarmerProfileSchema

router = APIRouter(prefix="/api/farmer", tags=["Farmer"])

# In-memory store initialized with Ramesh Patil
current_farmer_profile = FarmerProfileSchema(
    id="farmer_akola_01",
    name="Ramesh Patil (रमेश पाटील)",
    phone="+91 98223 45678",
    state="Maharashtra",
    district="Akola",
    taluka="Akot",
    village="Kavtha Kadu",
    currentCrop="Tomato",
    cropVariety="Abhinav (Seminis)",
    growthStage="Flowering",
    landAreaAcre=3.5,
    locationConsent=True,
    latitude=21.0975,
    longitude=77.0583
)

@router.get("/profile", response_model=FarmerProfileSchema)
def get_profile():
    return current_farmer_profile

@router.put("/profile", response_model=FarmerProfileSchema)
def update_profile(updated: FarmerProfileSchema):
    global current_farmer_profile
    current_farmer_profile = updated
    return current_farmer_profile
