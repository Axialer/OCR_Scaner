from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status

from .services import UploadService, ProcessingService ,CorrectingErrors#, OcrScanner
from .models import PersonInfo, PersonResponse, PersonCreate, PersonUpdate
from .repositories import PeopleRepository


router = APIRouter(prefix="")

def get_upload_service():
    return UploadService()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    upload_service: UploadService = Depends(get_upload_service)
):
    return await upload_service.upload_file(file)

@router.post("/process")
async def process_file():
    processor = ProcessingService() 
    processing_results = processor.process_all_images()
    
    # 3. Возвращаем комбинированный результат
    return {"processing": processing_results}
"""    
@router.post("/ocr")
async def ocr_file():
    ocr = OcrScanner(
        languages=['en']
    )
    result = ocr.ocr_scan()
    return {"processing": result}  
<<<<<<< HEAD
"""

@router.post("/correct")
async def find_error():
    corrector = CorrectingErrors() 
    corrected_results = corrector.find_errors()
    
    # 3. Возвращаем комбинированный результат
    return {"processing": corrected_results}
=======
>>>>>>> 4f296facc7d6f28245f264a12bc4031d7d011a8e
