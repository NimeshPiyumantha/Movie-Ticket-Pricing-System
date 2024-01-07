from pydantic import BaseModel

class Movies(BaseModel):
        id: int;
        mName: str;
        mYear: str;
        mCategory: str;
        mDuration: str;
        mLanguage: str;
        mDirector: str;