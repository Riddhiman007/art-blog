from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    
    secret_key:str = '197c8e7d7f21def21d3738fe059a51395ec2683fb487de85b843fd365cbf0f489312e70a7d5757ff787d3f43957e88353ea10da0de382dd2e5c9454900b66d7d'
    token_url:str = '/user/login/token'
    algorithm:str = 'HS256'
    class Config():
        env_file = '.env'
        env_file_encoding = 'utf-8'
    
settings = Settings()