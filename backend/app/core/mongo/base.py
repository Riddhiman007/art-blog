from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient


client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.ArtBlog

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid object")
        return ObjectId(v)
    
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

def user_helper(user)->dict:
    return{
        "id":str(user["_id"]),
        "FullName":user["FullName"],
        "username":user["username"],
        "email":user["email"],
        "password":user["password"]
    }