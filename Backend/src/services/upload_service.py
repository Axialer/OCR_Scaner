import uuid
import os
from pathlib import Path

from fastapi import HTTPException, UploadFile

class UploadService:
    def __init__(self, upload_dir: str = "src/uploads"):
        self.upload_dir = upload_dir
        Path(self.upload_dir).mkdir(exist_ok=True)

    async def upload_file(self, file: UploadFile):
        try:
            # Генерируем уникальное имя файла
            file_ext = file.filename.split(".")[-1]
            new_filename = f"{uuid.uuid4()}.{file_ext}"
            file_path = os.path.join(self.upload_dir, new_filename)
            
            contents = await file.read()
            with open(file_path, 'wb') as f:
                f.write(contents)
            
            return {
                "filename": new_filename,
                "original_name": file.filename,
                "file_path": file_path,
                "status": "uploaded"
            }
        except Exception as e:
            raise HTTPException(
                status_code=500, 
                detail=f"Error uploading file: {str(e)}"
            )
        finally:
            await file.close()