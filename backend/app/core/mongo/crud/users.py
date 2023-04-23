from ..base import db,user_helper

user_collection = db.user

async def add_user(user:dict)->dict:
    create = await user_collection.insert_one(user)
    new_user = await user_collection.find_one({"_id":create.inserted_id})
    return user_helper(new_user)