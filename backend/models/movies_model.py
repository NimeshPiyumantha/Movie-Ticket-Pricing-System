from pydantic import BaseModel

class Movies(BaseModel):
        mName: str;
        mYear: str;
        mCategory: str;
        mDuration: str;
        mLanguage: str;
        mDirector: str;