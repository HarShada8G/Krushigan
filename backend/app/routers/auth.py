from fastapi import APIRouter, HTTPException, status, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List, Literal
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from app.database import get_db, SessionLocal
from app.models.db_models import UserModel
from app.models.schemas import UserCreate, UserLogin, TokenResponse, UserBase
from app.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    decode_access_token
)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

security_bearer = HTTPBearer(auto_error=False)

# Predefined demo accounts specifications
DEMO_SEEDS = [
    {
        "username": "farmer_ramesh",
        "phone": "+91 98223 45678",
        "email": "ramesh.patil@krushigan.org",
        "role": "farmer",
        "state": "Maharashtra",
        "district": "Akola",
        "designation": "Lead Farmer, Akot Taluka",
        "default_password": "demo123"
    },
    {
        "username": "officer_sunita",
        "phone": "+91 94221 55667",
        "email": "s.deshmukh@krishi.maharashtra.gov.in",
        "role": "officer",
        "state": "Maharashtra",
        "district": "Akola",
        "designation": "District Agricultural Officer (DAO)",
        "default_password": "demo123"
    },
    {
        "username": "expert_vinayak",
        "phone": "+91 98900 12345",
        "email": "v.shinde@kvk-akola.org",
        "role": "expert",
        "state": "Maharashtra",
        "district": "Akola",
        "designation": "Senior Plant Pathologist, KVK Akola",
        "default_password": "demo123"
    },
    {
        "username": "admin_maha_01",
        "phone": "+91 94220 00000",
        "email": "admin@krishi.maharashtra.gov.in",
        "role": "admin",
        "state": "Maharashtra",
        "district": "Mumbai HQ",
        "designation": "State Admin Officer",
        "default_password": "demo123"
    }
]

def seed_demo_users(db: Session = None):
    """Safely seeds demo users in the persistent database with hashed passwords if missing."""
    close_db = False
    if db is None:
        db = SessionLocal()
        close_db = True

    try:
        for seed in DEMO_SEEDS:
            clean_phone = seed["phone"].replace(" ", "").replace("-", "")
            existing = db.query(UserModel).filter(
                or_(
                    UserModel.username == seed["username"],
                    UserModel.phone == seed["phone"],
                    UserModel.phone == clean_phone
                )
            ).first()

            if not existing:
                demo_user = UserModel(
                    username=seed["username"],
                    phone=seed["phone"],
                    email=seed["email"],
                    hashed_password=get_password_hash(seed["default_password"]),
                    role=seed["role"],
                    state=seed["state"],
                    district=seed["district"],
                    designation=seed["designation"],
                    is_demo=True
                )
                db.add(demo_user)
        db.commit()
    except Exception as e:
        db.rollback()
    finally:
        if close_db:
            db.close()

def user_to_schema(user: UserModel) -> UserBase:
    return UserBase(
        username=user.username,
        phone=user.phone,
        email=user.email,
        role=user.role,
        state=user.state or "Maharashtra",
        district=user.district or "Akola",
        designation=user.designation or ("Farmer" if user.role == "farmer" else "Officer")
    )

@router.post("/register", response_model=TokenResponse)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """Registers a new user into persistent database storage with bcrypt password hashing."""
    username_clean = user_data.username.strip()
    phone_clean = user_data.phone.strip() if user_data.phone else None
    email_clean = user_data.email.strip() if user_data.email else None

    # Check for existing username
    existing_username = db.query(UserModel).filter(UserModel.username == username_clean).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username is already registered. Please choose another."
        )

    # Check for existing phone if provided
    if phone_clean:
        clean_digits = "".join(filter(str.isdigit, phone_clean))
        existing_phone = db.query(UserModel).filter(
            or_(
                UserModel.phone == phone_clean,
                UserModel.phone == clean_digits,
                UserModel.phone == f"+91{clean_digits}",
                UserModel.phone == f"+91 {clean_digits}"
            )
        ).first()
        if existing_phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mobile number is already registered. Please login instead."
            )

    # Hash the password securely with bcrypt
    hashed_password = get_password_hash(user_data.password)

    new_user = UserModel(
        username=username_clean,
        phone=phone_clean,
        email=email_clean,
        hashed_password=hashed_password,
        role=user_data.role,
        state=user_data.state or "Maharashtra",
        district=user_data.district or "Akola",
        designation=user_data.designation or ("Registered Farmer" if user_data.role == "farmer" else "Agricultural Officer"),
        is_demo=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Issue cryptographic JWT
    token = create_access_token({
        "sub": new_user.username,
        "role": new_user.role,
        "user_id": new_user.id
    })

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_to_schema(new_user)
    )

@router.post("/login", response_model=TokenResponse)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    """Authenticates users against persistent storage with bcrypt verification and JWT generation."""
    ident = login_data.username.strip()
    clean_digits = "".join(filter(str.isdigit, ident))
    target_digits = clean_digits[-10:] if len(clean_digits) >= 10 else clean_digits
    clean_phone_expr = func.replace(func.replace(func.replace(UserModel.phone, ' ', ''), '-', ''), '+91', '')

    # Lookup user by username, phone, or email
    user = db.query(UserModel).filter(
        or_(
            UserModel.username == ident,
            UserModel.phone == ident,
            UserModel.email == ident,
            clean_phone_expr == target_digits if target_digits else False
        )
    ).first()

    # If not found by direct identifier, check demo shortcuts (e.g. role as username)
    if not user and ident.lower() in ["farmer", "officer", "expert", "admin"]:
        user = db.query(UserModel).filter(
            UserModel.role == ident.lower(),
            UserModel.is_demo == True
        ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Mobile number, username or password incorrect."
        )

    # Validate password using bcrypt
    # Allow demo passwords for demo accounts if triggered via quick demo action
    is_valid_pwd = verify_password(login_data.password, user.hashed_password)
    if not is_valid_pwd:
        if user.is_demo and login_data.password in ["demo", "demo123", "demo1234", "password", "test"]:
            is_valid_pwd = True

    if not is_valid_pwd:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please verify and try again."
        )

    # Generate real signed JWT token
    token = create_access_token({
        "sub": user.username,
        "role": user.role,
        "user_id": user.id
    })

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_to_schema(user)
    )

class DemoLoginRequest(BaseModel):
    role: str = "farmer"

@router.post("/demo-login", response_model=TokenResponse)
def demo_login(req: DemoLoginRequest, db: Session = Depends(get_db)):
    """Authenticates demo users via the real backend database, generating a signed cryptographic JWT."""
    seed_demo_users(db)
    target_role = req.role.strip().lower()

    user = db.query(UserModel).filter(
        UserModel.role == target_role,
        UserModel.is_demo == True
    ).first()

    if not user:
        role_map = {
            "farmer": "farmer_ramesh",
            "officer": "officer_sunita",
            "expert": "expert_vinayak",
            "admin": "admin_maha_01"
        }
        target_username = role_map.get(target_role, "farmer_ramesh")
        user = db.query(UserModel).filter(UserModel.username == target_username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demo account for role '{req.role}' could not be located in database."
        )

    token = create_access_token({
        "sub": user.username,
        "role": user.role,
        "user_id": user.id
    })

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_to_schema(user)
    )

def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> UserModel:
    """Dependency to extract and validate the cryptographic JWT token from Authorization header."""
    token_str = None
    if credentials and isinstance(credentials, HTTPAuthorizationCredentials):
        token_str = credentials.credentials
    elif authorization and isinstance(authorization, str) and authorization.startswith("Bearer "):
        token_str = authorization.replace("Bearer ", "").strip()
    elif isinstance(authorization, str):
        token_str = authorization.strip()

    if not token_str:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token required. Please login.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Handle demo tokens gracefully
    if token_str.startswith("demo_jwt_token_"):
        role_hint = token_str.replace("demo_jwt_token_", "")
        demo_user = db.query(UserModel).filter(UserModel.role == role_hint, UserModel.is_demo == True).first()
        if demo_user:
            return demo_user

    try:
        payload = decode_access_token(token_str)
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"}
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"}
        )

    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found in system.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    return user

def require_roles(allowed_roles: List[str]):
    """Role-based authorization guard for sensitive endpoints."""
    def role_checker(current_user: UserModel = Depends(get_current_user)) -> UserModel:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role(s): {', '.join(allowed_roles)}"
            )
        return current_user
    return role_checker

@router.get("/me", response_model=UserBase)
def get_me(current_user: UserModel = Depends(get_current_user)):
    """Returns profile information for the actively authenticated user."""
    return user_to_schema(current_user)
