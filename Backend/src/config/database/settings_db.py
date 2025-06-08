# src/config/database/settings_db.py
from pydantic_settings import BaseSettings

class ConfigDataBase(BaseSettings):
    SQLITE_DB_PATH: str = "app.db"
    DB_ECHO_LOG: bool = False

    @property
    def database_url(self) -> str:
        return f"sqlite+aiosqlite:///src/{self.SQLITE_DB_PATH}"

# Создаем экземпляр настроек
settings_db = ConfigDataBase()