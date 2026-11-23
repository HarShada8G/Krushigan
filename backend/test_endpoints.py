import asyncio
import sqlite3
from datetime import timedelta
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app, root, health_check
from app.config import ALLOWED_ORIGINS
from app.database import Base, init_db, get_db, normalize_database_url
from app.models.db_models import UserModel
from app.models.schemas import (
    UserCreate, 
    UserLogin, 
    AnalyzeRequest, 
    FarmerProfileSchema,
    BroadcastAlertCreate,
    CropReportCreate,
    DiagnosisResultSchema,
    RecommendationsSchema,
    GreenTier,
    YellowTier,
    RedTier
)
from app.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    decode_access_token
)
from app.routers.auth import (
    seed_demo_users,
    register_user,
    login_user,
    get_current_user,
    require_roles
)
from app.routers.farmer import get_profile, update_profile
from app.routers.officer import broadcast_alert, simulate_retraining, get_hotspots, get_dashboard_summary
from app.routers.expert import validate_report, request_new_image, ValidationRequest, RequestImagePayload
from app.routers.reports import analyze_crop, create_report, update_follow_up, FollowUpRequest
from app.routers.weather import get_current_weather
from app.routers.ai import chat_with_assistant, AIChatRequest

# -------------------------------------------------------------
# ISOLATED IN-MEMORY TEST DATABASE SETUP
# -------------------------------------------------------------
TEST_DB_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

# Dependency override so all FastAPI endpoints use isolated in-memory DB
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

async def run_tests():
    print("=================================================================")
    print("KRUSHIGAN COMPLETE COMPREHENSIVE PRODUCTION READINESS TEST SUITE")
    print("=================================================================\n")

    # Record baseline state of real development database
    real_db_conn = sqlite3.connect("krushigan.db")
    c = real_db_conn.cursor()
    c.execute("SELECT count(*) FROM users;")
    initial_user_count = c.fetchone()[0]
    real_db_conn.close()
    print(f"Baseline real development database record count: {initial_user_count} users")

    # 1. Test PostgreSQL URL Normalization (Task 2)
    print("\n1. Testing Database URL Normalization & PostgreSQL Compatibility (Task 2)...")
    render_url = "postgres://krushigan_user:supersecretpass@dpg-render-db.oregon-postgres.render.com/krushigan"
    normalized = normalize_database_url(render_url)
    assert normalized.startswith("postgresql://"), f"Failed to normalize Render URL: {normalized}"
    assert "krushigan_user" in normalized

    pg_standard = "postgresql://user:pass@localhost:5432/db"
    assert normalize_database_url(pg_standard) == pg_standard

    sqlite_url = "sqlite:///./krushigan.db"
    assert normalize_database_url(sqlite_url) == sqlite_url
    print("   ✓ PostgreSQL Render URL normalization ('postgres://' -> 'postgresql://') passed.")
    print("   ✓ Standard PostgreSQL and SQLite URLs preserved cleanly.")

    # 2. Initialize In-Memory Test Database
    print("\n2. Initializing Isolated In-Memory Test Database (Task 3)...")
    init_db(target_engine=test_engine)
    test_db = TestingSessionLocal()
    seed_demo_users(db=test_db)
    demo_count = test_db.query(UserModel).count()
    assert demo_count >= 4, f"Expected at least 4 demo accounts, got {demo_count}"
    print(f"   ✓ In-memory test database initialized with {demo_count} seeded accounts.")

    # 3. Test Registration & Bcrypt Hashing (Isolated DB)
    print("\n3. Testing Registration, Bcrypt Hashing & Expiry (Tasks 1 & 2)...")
    reg_res = register_user(UserCreate(
        username="farmer_devendra",
        phone="9876543210",
        password="SecurePassword@123",
        role="farmer",
        state="Maharashtra",
        district="Nashik"
    ), db=test_db)

    assert reg_res.access_token is not None
    created_user = test_db.query(UserModel).filter(UserModel.username == "farmer_devendra").first()
    assert created_user is not None
    assert created_user.hashed_password.startswith("$2b$") or created_user.hashed_password.startswith("$2a$")
    assert verify_password("SecurePassword@123", created_user.hashed_password)
    print("   ✓ User registered with bcrypt hashed password in isolated database.")

    # 4. Test Password Authentication & Incorrect Password Rejection
    print("\n4. Testing Password Verification & Rejection (Task 2)...")
    # Correct password
    login_ok = login_user(UserLogin(
        username="9876543210",
        password="SecurePassword@123",
        role="farmer"
    ), db=test_db)
    assert login_ok.access_token is not None
    farmer_token = login_ok.access_token
    print("   ✓ Valid password accepted, cryptographic JWT issued.")

    # Incorrect password
    bad_pwd_rejected = False
    try:
        login_user(UserLogin(
            username="9876543210",
            password="WrongPassword999",
            role="farmer"
        ), db=test_db)
    except HTTPException as e:
        if e.status_code == 401:
            bad_pwd_rejected = True
    assert bad_pwd_rejected, "CRITICAL: Incorrect password was not rejected!"
    print("   ✓ Incorrect password rejected with HTTP 401 Unauthorized.")

    # 5. Test Cryptographic JWT: Expiry, Tampering & Decode (Task 3)
    print("\n5. Testing Cryptographic JWT Validation (Task 3)...")
    payload = decode_access_token(farmer_token)
    assert payload["sub"] == "farmer_devendra"
    assert payload["role"] == "farmer"

    # Tampered token
    tampered_token = farmer_token[:-6] + "ABCDEF"
    tampered_ok = False
    try:
        get_current_user(authorization=f"Bearer {tampered_token}", db=test_db)
    except HTTPException as e:
        if e.status_code == 401:
            tampered_ok = True
    assert tampered_ok, "CRITICAL: Tampered JWT token was accepted!"
    print("   ✓ Tampered JWT token rejected with HTTP 401.")

    # Expired token
    expired_token = create_access_token({"sub": "farmer_devendra", "role": "farmer"}, expires_delta=timedelta(seconds=-10))
    expired_ok = False
    try:
        get_current_user(authorization=f"Bearer {expired_token}", db=test_db)
    except HTTPException as e:
        if e.status_code == 401:
            expired_ok = True
    assert expired_ok, "CRITICAL: Expired JWT token was accepted!"
    print("   ✓ Expired JWT token rejected with HTTP 401.")

    # 6. Test Unauthorized (401) on Protected Endpoints
    print("\n6. Testing Unauthenticated Request Rejection (HTTP 401)...")
    unauth_profile = False
    try:
        get_profile(current_user=get_current_user(authorization=None, db=test_db))
    except HTTPException as e:
        if e.status_code == 401:
            unauth_profile = True
    assert unauth_profile, "CRITICAL: Unauthenticated access to /api/farmer/profile allowed!"

    unauth_alert = False
    try:
        officer_guard = require_roles(["officer", "admin"])
        officer_guard(current_user=get_current_user(authorization=None, db=test_db))
    except HTTPException as e:
        if e.status_code == 401:
            unauth_alert = True
    assert unauth_alert, "CRITICAL: Unauthenticated access to /api/officer/alerts allowed!"
    print("   ✓ Unauthenticated requests to protected endpoints rejected with HTTP 401.")

    # 7. Test Role-Based Authorization & Forbidden Access (HTTP 403)
    print("\n7. Testing Role-Based Guard Rejections (HTTP 403)...")
    farmer_user = test_db.query(UserModel).filter(UserModel.username == "farmer_devendra").first()
    officer_user = test_db.query(UserModel).filter(UserModel.username == "officer_sunita").first()
    expert_user = test_db.query(UserModel).filter(UserModel.username == "expert_vinayak").first()

    # Farmer attempting officer broadcast alert
    farmer_blocked_from_officer = False
    try:
        broadcast_alert(BroadcastAlertCreate(
            title="Unauthorized alert",
            district="Nashik",
            taluka="Niphad",
            crop="Tomato",
            diseaseOrPest="Blight",
            riskLevel="high",
            messageHi="Test",
            messageMr="Test",
            messageEn="Test"
        ), current_user=require_roles(["officer", "admin"])(farmer_user))
    except HTTPException as e:
        if e.status_code == 403:
            farmer_blocked_from_officer = True
    assert farmer_blocked_from_officer, "CRITICAL: Farmer bypassed officer alert guard!"

    # Farmer attempting expert validation
    farmer_blocked_from_expert = False
    try:
        validate_report(ValidationRequest(
            reportId="REP-2026-AKL-001",
            action="confirm",
            verifiedDiagnosis="Early Blight",
            notes="Farmer trying to validate"
        ), current_user=require_roles(["expert", "admin"])(farmer_user))
    except HTTPException as e:
        if e.status_code == 403:
            farmer_blocked_from_expert = True
    assert farmer_blocked_from_expert, "CRITICAL: Farmer bypassed expert validation guard!"

    # Officer attempting farmer profile
    officer_blocked_from_farmer = False
    try:
        get_profile(current_user=officer_user)
    except HTTPException as e:
        if e.status_code == 403:
            officer_blocked_from_farmer = True
    assert officer_blocked_from_farmer, "CRITICAL: Officer accessed farmer-only profile!"
    print("   ✓ Farmer blocked from officer alerts & expert validation with HTTP 403.")
    print("   ✓ Officer blocked from private farmer profile with HTTP 403.")

    # 8. Test Private Data Isolation: User A cannot modify User B's profile
    print("\n8. Testing User Profile Privacy & Isolation...")
    # Register Farmer B
    register_user(UserCreate(
        username="farmer_anand",
        phone="9876543222",
        password="SecurePassword@123",
        role="farmer",
        state="Maharashtra",
        district="Pune"
    ), db=test_db)
    farmer_b = test_db.query(UserModel).filter(UserModel.username == "farmer_anand").first()

    # Farmer A tries to modify Farmer B's profile
    unauthorized_profile_tamper = False
    try:
        update_profile(
            FarmerProfileSchema(
                id="farmer_anand", # Target is Farmer B
                name="Tampered Name",
                phone="9876543222",
                state="Maharashtra",
                district="Pune",
                taluka="Haveli",
                village="Uruli",
                currentCrop="Sugarcane",
                growthStage="Vegetative",
                landAreaAcre=4.0,
                locationConsent=True
            ),
            current_user=farmer_user, # Authenticated user is Farmer A
            db=test_db
        )
    except HTTPException as e:
        if e.status_code == 403:
            unauthorized_profile_tamper = True
    assert unauthorized_profile_tamper, "CRITICAL: Farmer A successfully modified Farmer B's private profile!"
    print("   ✓ Privacy enforced: User A cannot modify User B's profile (HTTP 403).")

    # Farmer A modifying their own profile
    own_profile_update = update_profile(
        FarmerProfileSchema(
            id="farmer_devendra",
            name="farmer_devendra",
            phone="9876543210",
            state="Maharashtra",
            district="Nashik",
            taluka="Dindori",
            village="Mohadi",
            currentCrop="Grapes",
            growthStage="Fruiting",
            landAreaAcre=5.0,
            locationConsent=True
        ),
        current_user=farmer_user,
        db=test_db
    )
    assert own_profile_update.taluka == "Dindori"
    assert farmer_user.taluka == "Dindori"
    print("   ✓ User successfully updated their own farm profile.")

    # 9. Test Authorized Access for Proper Roles
    print("\n9. Testing Authorized Role Operations...")
    # Officer alert broadcast
    alert_res = broadcast_alert(BroadcastAlertCreate(
        title="Tomato Blight Alert",
        district="Nashik",
        taluka="Niphad",
        crop="Tomato",
        diseaseOrPest="Early Blight",
        riskLevel="high",
        messageHi="सतर्क रहें",
        messageMr="सावध रहा",
        messageEn="Stay alert"
    ), current_user=require_roles(["officer", "admin"])(officer_user))
    assert alert_res.id.startswith("ALT-2026")
    print(f"   ✓ Officer broadcast alert authorized: {alert_res.id}")

    # Officer model retraining simulation
    retrain_res = simulate_retraining(current_user=require_roles(["officer", "admin"])(officer_user))
    assert retrain_res["success"] is True
    print("   ✓ Officer retraining simulation authorized.")

    # Expert report validation
    val_res = validate_report(ValidationRequest(
        reportId="REP-2026-AKL-001",
        action="confirm",
        verifiedDiagnosis="Early Blight",
        notes="Verified under microscope"
    ), current_user=require_roles(["expert", "admin"])(expert_user))
    assert val_res["success"] is True
    print(f"   ✓ Expert report validation authorized: {val_res['message']}")

    # Expert request image
    req_img = request_new_image(RequestImagePayload(
        reportId="REP-2026-AKL-001",
        reason="Need clearer picture of stem lesion"
    ), current_user=require_roles(["expert", "admin"])(expert_user))
    assert req_img["smsSent"] is True
    print("   ✓ Expert request-image authorized.")

    # Farmer creating report
    new_rep = create_report(CropReportCreate(
        farmerId="farmer_devendra",
        farmerName="Devendra",
        phone="9876543210",
        district="Nashik",
        taluka="Dindori",
        village="Mohadi",
        crop="Tomato",
        variety="Abhinav",
        growthStage="Flowering",
        imageUrl="/images/crops/tomato_early_blight.jpg",
        diagnosis=DiagnosisResultSchema(
            id="diag_new",
            reportId="rep_new",
            crop="Tomato",
            detectedProblem="Early Blight",
            hindiName="अगेती झुलसा",
            marathiName="करपा",
            confidenceScore=0.91,
            severity="medium",
            symptoms=["Spots on leaves"],
            recommendations=RecommendationsSchema(
                green=GreenTier(title="Green", items=["Clean"]),
                yellow=YellowTier(title="Yellow", items=["Neem"]),
                red=RedTier(title="Red", activeIngredient="Mancozeb", targetProblem="Blight", authoritySource="KVK", applicationInstructions="2.5g/L")
            )
        )
    ), current_user=farmer_user)
    assert new_rep.id.startswith("REP-2026")
    assert new_rep.farmerId == "farmer_devendra"
    print(f"   ✓ Farmer report creation authorized: {new_rep.id}")

    # Farmer updating follow-up for their own report
    fu_res = update_follow_up(FollowUpRequest(
        reportId=new_rep.id,
        status="improved",
        notes="Lesions stopped spreading"
    ), current_user=farmer_user)
    assert fu_res["success"] is True
    print("   ✓ Farmer report follow-up updated authorized.")

    # Farmer B trying to update Farmer A's report follow-up
    fu_tamper_blocked = False
    try:
        update_follow_up(FollowUpRequest(
            reportId=new_rep.id,
            status="worsened",
            notes="Hacked follow-up"
        ), current_user=farmer_b)
    except HTTPException as e:
        if e.status_code == 403:
            fu_tamper_blocked = True
    assert fu_tamper_blocked, "CRITICAL: Farmer B updated Farmer A's report follow-up!"
    print("   ✓ Follow-up privacy enforced: Farmer B cannot modify Farmer A's report (HTTP 403).")

    # 10. Test Production-Safe CORS
    print("\n10. Testing Production CORS Rules...")
    assert "*" not in ALLOWED_ORIGINS, "CRITICAL: Wildcard CORS '*' present!"
    assert "http://localhost:5173" in ALLOWED_ORIGINS
    assert "http://untrusted-site.com" not in ALLOWED_ORIGINS
    print(f"   ✓ Wildcard '*' removed. Allowed origins: {ALLOWED_ORIGINS}")

    # 11. Test Core Public Endpoints
    print("\n11. Testing Public Endpoints...")
    assert root()["status"] == "operational"
    assert health_check()["status"] == "healthy"
    w = await get_current_weather("Nashik")
    assert w.district.lower() == "nashik"
    ai_res = await chat_with_assistant(AIChatRequest(message="टमाटर में अर्ली ब्लाइट का जैविक उपाय क्या है?", language="hi"))
    assert len(ai_res.answer) > 20
    diag = await analyze_crop(AnalyzeRequest(
        image_data="data:image/jpeg;base64,demo",
        crop="Tomato",
        growth_stage="Flowering"
    ))
    assert diag.crop == "Tomato"
    print("   ✓ Root, Health, Weather, AI Chat, and Multimodal Vision passed.")

    # 12. Verify Zero Pollution of Real Development Database
    print("\n12. Verifying Real Development Database (krushigan.db) Isolation...")
    real_db_conn2 = sqlite3.connect("krushigan.db")
    c2 = real_db_conn2.cursor()
    c2.execute("SELECT count(*) FROM users;")
    final_user_count = c2.fetchone()[0]
    c2.execute("SELECT username FROM users WHERE username IN ('farmer_devendra', 'farmer_anand', 'sunil_kisan_01');")
    leak_records = c2.fetchall()
    real_db_conn2.close()

    assert final_user_count == initial_user_count, f"Database mutated! Initial {initial_user_count}, now {final_user_count}"
    assert len(leak_records) == 0, f"Test users leaked into krushigan.db: {leak_records}"
    print(f"   ✓ Confirmed: krushigan.db remains completely untouched ({final_user_count} users, 0 test leaks).")

    print("\n=================================================================")
    print("ALL 12 PRODUCTION VERIFICATION STAGES PASSED 100%!")
    print("=================================================================\n")

    test_db.close()

if __name__ == "__main__":
    asyncio.run(run_tests())
