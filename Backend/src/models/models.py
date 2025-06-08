from datetime import datetime
from enum import Enum
from typing import Optional, List

from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String, Enum as SQLEnum

class ProviderName(str, Enum):
    GOOGLE_DRIVE = "google_drive"
    YANDEX_DISK = "yandex_disk"
    GITHUB = "github"

class DocumentStatus(str, Enum):
    UPLOADED = "UPLOADED"
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"
    FAILED = "FAILED"

class User(SQLModel, table=True):
    __tablename__ = "users"
    
    user_id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(sa_column=Column(String(50), unique=True))
    email: str = Field(sa_column=Column(String(100), unique=True))
    password_hash: str = Field(sa_column=Column(String(255)))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)
    
    subscription: Optional["PremiumSubscription"] = Relationship(back_populates="user")
    storage_mappings: List["UserStorageMapping"] = Relationship(back_populates="user")
    reset_codes: List["PasswordResetCode"] = Relationship(back_populates="user")

class PremiumSubscription(SQLModel, table=True):
    __tablename__ = "premium_subscriptions"
    
    subscription_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.user_id")
    is_active: bool = Field(default=False)
    start_date: Optional[datetime] = Field(default=None)
    end_date: Optional[datetime] = Field(default=None)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    user: User = Relationship(back_populates="subscription")

class CloudStorage(SQLModel, table=True):
    __tablename__ = "cloud_storages"
    
    storage_id: Optional[int] = Field(default=None, primary_key=True)
    provider_name: ProviderName = Field(sa_column=Column(SQLEnum(ProviderName)))
    access_token: str = Field(sa_column=Column(String(255)))
    refresh_token: str = Field(sa_column=Column(String(255)))
    connected_at: datetime = Field(default_factory=datetime.utcnow)
    
    storage_mappings: List["UserStorageMapping"] = Relationship(back_populates="storage")

class UserStorageMapping(SQLModel, table=True):
    __tablename__ = "user_storage_mapping"
    
    mapping_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.user_id")
    storage_id: int = Field(foreign_key="cloud_storages.storage_id")
    is_default: bool = Field(default=False)
    
    user: User = Relationship(back_populates="storage_mappings")
    storage: CloudStorage = Relationship(back_populates="storage_mappings")
    folders: List["DocumentFolder"] = Relationship(back_populates="storage_mapping")

class DocumentFolder(SQLModel, table=True):
    __tablename__ = "document_folders"
    
    folder_id: Optional[int] = Field(default=None, primary_key=True)
    mapping_id: int = Field(foreign_key="user_storage_mapping.mapping_id")
    folder_name: str = Field(sa_column=Column(String(100)))
    remote_path: str = Field(sa_column=Column(String(255)))
    
    storage_mapping: UserStorageMapping = Relationship(back_populates="folders")
    documents: List["ScannedDocument"] = Relationship(back_populates="folder")

class ScannedDocument(SQLModel, table=True):
    __tablename__ = "scanned_documents"
    
    document_id: Optional[int] = Field(default=None, primary_key=True)
    folder_id: int = Field(foreign_key="document_folders.folder_id")
    file_name: str = Field(sa_column=Column(String(255)))
    ocr_text: Optional[str] = Field(default=None)
    scanned_at: datetime = Field(default_factory=datetime.utcnow)
    last_processed_at: Optional[datetime] = Field(default=None)
    
    folder: DocumentFolder = Relationship(back_populates="documents")
    status_history: List["DocumentStatusLog"] = Relationship(back_populates="document")

class DocumentStatusLog(SQLModel, table=True):
    __tablename__ = "document_status_log"
    
    log_id: Optional[int] = Field(default=None, primary_key=True)
    document_id: int = Field(foreign_key="scanned_documents.document_id")
    status: DocumentStatus = Field(sa_column=Column(SQLEnum(DocumentStatus)))
    changed_at: datetime = Field(default_factory=datetime.utcnow)
    
    document: ScannedDocument = Relationship(back_populates="status_history")

class PasswordResetCode(SQLModel, table=True):
    __tablename__ = "password_reset_codes"
    
    code_id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.user_id")
    code: str = Field(sa_column=Column(String(6)))
    expires_at: datetime
    is_used: bool = Field(default=False)
    
    user: User = Relationship(back_populates="reset_codes")