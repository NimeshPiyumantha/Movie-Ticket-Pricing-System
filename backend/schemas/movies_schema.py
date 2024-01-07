def individual_serial(movies: dict) -> dict:
    return {
        "id": str(movies["_id"]),
        "mName": movies["mName"],
        "mYear": movies["mYear"],
        "mCategory": movies["mCategory"],
        "mDuration": movies["mDuration"],
        "mLanguage": movies["mLanguage"],
        "mDirector": movies["mDirector"],
    }

def list_serial(movies) -> list:
    return [individual_serial(movie) for movie in movies]
