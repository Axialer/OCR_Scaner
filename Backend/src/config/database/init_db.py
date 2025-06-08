# src/config/database/init_db.py
import asyncio
from .db_helper import db_helper1

async def init_models():
    await db_helper1.create_db_and_tables()
    print("Database tables created successfully")

if __name__ == "__main__":
    asyncio.run(init_models())