from passlib.context import CryptContext

context = CryptContext(schemes=["bcrypt"], deprecated='auto')

def get_hashed_password(password): 
    return context.hash(password)
    
def verify_password(password:str, hashed_pass:str) -> bool:
    return context.verify(password, hashed_pass)