def individual_serial(movies) -> dict:
                    return {
                            "id": movies.id,
                            "mName": movies.mName,
                            "mYear": movies.mYear,
                            "mCategory": movies.mCategory,
                            "mDuration": movies.mDuration,
                            "mLanguage": movies.mLanguage,
                            "mDirector": movies.mDirector,
                    }

def list_serial(movies) -> list:
                    return [individual_serial(movies) for movies in movies]