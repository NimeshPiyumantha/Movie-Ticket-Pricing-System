import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../api/api";
import { movieApi } from "../../api/crudApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { movieActions } from "./movieSlice";

interface IMovieData {
  id: string;
  mName: string;
  mYear: string;
  mCategory: string;
  mDuration: string;
  mLanguage: string;
  mDirector: string;
}

interface IMovieResponse {
  data: {
    message: string;
    data: IMovieData[];
  };
}

function* fetchMovie() {
  try {
    const response: IMovieResponse = yield call(api.get, movieApi);
    yield put(movieActions.setMovieEntries(response.data.data));
  } catch (e) {
    alert("Error fetching movie data " + e);
  }
}

function* addAndUpdateMovie(action: PayloadAction<IMovieData>) {
  const data = action.payload;

  const movieData = {
    mName: data.mName,
    mYear: data.mYear,
    mCategory: data.mCategory,
    mDuration: data.mDuration,
    mLanguage: data.mLanguage,
    mDirector: data.mDirector,
  };

  const isUpdate: boolean = Number(data.id) !== -1;

  try {
    if (isUpdate) {
      yield call(api.put,`${movieApi}/${data.id}`, movieData);
    } else {
      yield call(api.post, movieApi, movieData);
    }
    yield put(movieActions.fetchMovieEntry());
  } catch (e) {
    alert("Error adding/updating movie data " + e);
  }
}

function* deleteMovie(action: PayloadAction<string>) {
  const id = action.payload;
  try {
    yield call(api.delete, `${movieApi}/${id}`);
    yield put(movieActions.fetchMovieEntry());
  } catch (e) {
    alert("Error deleting movie data " + e);
  }
}

export function* movieSaga() {
  yield takeLatest(movieActions.fetchMovieEntry, fetchMovie);
  yield takeLatest(movieActions.addMovieEntry, addAndUpdateMovie);
  yield takeLatest(movieActions.deleteMovieEntry, deleteMovie);
}
