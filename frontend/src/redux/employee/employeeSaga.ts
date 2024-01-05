import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { employeeActions } from "./employeeSlice";
import { api } from "../../api/api";
import { employeeApi } from "../../api/crudApi";

interface IData {
  id: number;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IEmployeeData {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IEmployeeResponse {
  data: {
    message: string;
    data: IEmployeeData[];
  };
}

function* fetchEmployee() {
  try {
    const response: IEmployeeResponse = yield call(api.get, employeeApi);
    yield put(employeeActions.setUserEntries(response.data.data));
  } catch (e) {
    alert("Error fetching user data " + e);
  }
}

function* addAndUpdateEmployee(action: PayloadAction<IData>) {
  const data = action.payload;

  const employeeData = {
    roleType: data.roleType,
    name: data.name,
    address: data.address,
    email: data.email,
    mobileNumber: data.mobileNumber,
    dob: data.dob,
    password: data.password,
    gender: data.gender,
  };

  const isUpdate: boolean = data.id !== -1;

  try {
    if (isUpdate) {
      yield call(api.put, `${employeeApi}/${data.email}`, employeeData);
    } else {
      yield call(api.post, employeeApi, employeeData);
    }
    yield put(employeeActions.fetchEmployeeEntry());
  } catch (e) {
    alert("Error adding/updating user data " + e);
  }
}

function* deleteEmployee(action: PayloadAction<string>) {
  try {
    const email = action.payload;
    yield call(api.delete, `${employeeApi}/${email}`);
    yield put(employeeActions.fetchEmployeeEntry());
  } catch (e) {
    alert("Error deleting user data " + e);
  }
}

export function* employeeSaga() {
  yield takeLatest(employeeActions.fetchEmployeeEntry.type, fetchEmployee);
  yield takeLatest(
    employeeActions.saveAndUpdateEmployeeEntry.type,
    addAndUpdateEmployee
  );
  yield takeLatest(employeeActions.deleteEmployeeEntry.type, deleteEmployee);
}
