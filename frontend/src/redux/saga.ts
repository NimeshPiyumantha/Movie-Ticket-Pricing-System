import { all } from "redux-saga/effects";
import { employeeSaga } from "./employee/employeeSaga";

export default function* rootSaga() {
  yield all([employeeSaga()]);
}