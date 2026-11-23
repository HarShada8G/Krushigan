from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.schemas import FarmerProfileSchema
from app.models.db_models import UserModel
from app.database import get_db
from app.routers.auth import get_current_user, require_roles

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
def get_profile(current_user: UserModel = Depends(get_current_user)):
    """Returns the authenticated farmer's profile. Restricted to farmer or admin roles."""
    if current_user.role not in ["farmer", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to farmer accounts."
        )

    # Return stored profile for demo farmer
    if current_user.username in ["farmer_ramesh", "farmer"]:
        return current_farmer_profile

    # Dynamic profile for registered farmers
    return FarmerProfileSchema(
        id=current_user.username,
        name=current_user.username,
        phone=current_user.phone or "+91 98000 00000",
        state=current_user.state or "Maharashtra",
        district=current_user.district or "Akola",
        taluka=current_user.taluka or "General Taluka",
        village=current_user.village or "General Village",
        currentCrop="Tomato",
        cropVariety="Standard",
        growthStage="Active",
        landAreaAcre=2.5,
        locationConsent=True,
        latitude=20.7002,
        longitude=77.0082
    )

@router.put("/profile", response_model=FarmerProfileSchema)
def update_profile(
    updated: FarmerProfileSchema,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Updates the authenticated farmer's profile. Farmers cannot modify another user's private data."""
    if current_user.role not in ["farmer", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to farmer accounts."
        )

    # Privacy check: Farmers can only modify their own data
    if current_user.role != "admin":
        # Check matching ID or demo user identity
        is_own_profile = (
            updated.id == current_user.username or
            updated.id == current_user.phone or
            (current_user.username in ["farmer_ramesh", "farmer"] and updated.id == "farmer_akola_01")
        )
        if not is_own_profile:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: You cannot modify another user's private farm profile."
            )

    # Update database model for the user
    current_user.state = updated.state
    current_user.district = updated.district
    current_user.taluka = updated.taluka
    current_user.village = updated.village
    db.commit()

    global current_farmer_profile
    current_farmer_profile = updated
    return current_farmer_profile
