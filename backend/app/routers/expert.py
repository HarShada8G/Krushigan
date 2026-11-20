import time
from pydantic import BaseModel
from typing import Literal, Optional
from fastapi import APIRouter, HTTPException
from app.routers.reports import STORED_REPORTS
from app.models.schemas import ExpertValidationSchema, CropReportSchema

router = APIRouter(prefix="/api/expert", tags=["Expert Validation"])

class ValidationRequest(BaseModel):
    reportId: str
    action: Literal["confirm", "correct", "lab_referral", "unknown"]
    verifiedDiagnosis: str
    notes: str
    expertId: str = "EXP-KVK-AKL-09"
    expertName: str = "Dr. Vinayak Shinde"

class RequestImagePayload(BaseModel):
    reportId: str
    reason: str
    expertId: str = "EXP-KVK-AKL-09"

@router.post("/validate")
def validate_report(payload: ValidationRequest):
    for r in STORED_REPORTS:
        if r.id == payload.reportId:
            status_map = {
                "confirm": "expert_confirmed",
                "correct": "expert_corrected",
                "lab_referral": "lab_referred",
                "unknown": "expert_confirmed"
            }
            r.status = status_map.get(payload.action, "expert_confirmed")
            r.expertValidation = ExpertValidationSchema(
                expertId=payload.expertId,
                expertName=payload.expertName,
                verifiedDiagnosis=payload.verifiedDiagnosis,
                notes=payload.notes,
                validatedAt=time.strftime("%Y-%m-%d %I:%M %p"),
                status=payload.action if payload.action in ["confirmed", "corrected", "lab_referral", "unknown"] else "confirmed"
            )
            return {
                "success": True,
                "message": f"Report {payload.reportId} validated with status {r.status}",
                "datasetReady": True
            }
    raise HTTPException(status_code=404, detail="Report not found")

@router.post("/request-image")
def request_new_image(payload: RequestImagePayload):
    return {
        "success": True,
        "message": f"Farmer notified to re-upload clear photo for report {payload.reportId}: {payload.reason}",
        "smsSent": True
    }
