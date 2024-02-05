import { call, put, takeLatest } from "redux-saga/effects";
import { predictApi } from "../../api/crudApi";
import { api } from "../../api/api";
import { predictActions } from "./predictSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Toast } from "../../util/alert";


interface IPredictData {
  tickets_out: number;
  capacity: number;
  month: number;
  day: number;
}

function* addPredict(action: PayloadAction<IPredictData>) {
  const data = action.payload;

  const predictData = {
    tickets_out: data.tickets_out,
    capacity: data.capacity,
    month: data.month,
    day: data.day,
  };

  try {
    const response: AxiosResponse  = yield call(api.post, predictApi, predictData);
    yield put(predictActions.setTicketPrice(Number(response.data)));
    console.log(response.data);
    Toast.fire({
      icon: "success",
      title: "Predict Price Successfully",
    });
  } catch (e) {
    alert("Error adding predict data " + e);
  }
}



export function* predictSaga() {
  yield takeLatest(predictActions.addPredictEntry.type, addPredict);
}

