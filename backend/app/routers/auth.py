from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UserCreate, UserLogin, TokenResponse, UserBase

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# Predefined demo accounts
DEMO_CREDENTIALS = {
    "farmer": UserBase(
        username="farmer_ramesh",
        phone="+91 98223 45678",
        role="farmer",
        district="Akola",
        designation="Lead Farmer, Akot Taluka"
    ),
    "officer": UserBase(
        username="officer_sunita",
        phone="+91 94221 55667",
        email="s.deshmukh@krishi.maharashtra.gov.in",
        role="officer",
        district="Akola",
        designation="District Agricultural Officer (DAO)"
    ),
    "expert": UserBase(
        username="expert_vinayak",
        phone="+91 98900 12345",
        email="v.shinde@kvk-akola.org",
        role="expert",
        district="Akola",
        designation="Senior Plant Pathologist, KVK Akola"
    )
}

@router.post("/register", response_model=TokenResponse)
def register_user(user_data: UserCreate):
    return TokenResponse(
        access_token="demo_jwt_token_register_" + user_data.username,
        user=UserBase(
            username=user_data.username,
            phone=user_data.phone,
            email=user_data.email,
            role=user_data.role,
            district=user_data.district or "Akola",
            designation=user_data.designation or "Registered Farmer"
        )
    )

@router.post("/login", response_model=TokenResponse)
def login_user(login_data: UserLogin):
    role = login_data.role or "farmer"
    matched_user = DEMO_CREDENTIALS.get(role, DEMO_CREDENTIALS["farmer"])
    return TokenResponse(
        access_token=f"demo_jwt_token_{role}_{login_data.username}",
        user=matched_user
    )
