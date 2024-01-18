import { all } from "redux-saga/effects";
import { employeeSaga } from "./employee/employeeSaga";
import { movieSaga } from "./movie/movieSaga";
import { predictSaga } from "./predict/predictSaga";

export default function* rootSaga() {
  yield all([employeeSaga(), movieSaga(), predictSaga()]);
}
