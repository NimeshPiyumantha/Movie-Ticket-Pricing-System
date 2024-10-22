import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { employeeActions } from "./employeeSlice";
import { api } from "../../api/api";
import { employeeApi, userSignInApi } from "../../api/crudApi";
import { AxiosResponse } from "axios";
import { Toast } from "../../util/alert";

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
  id: string;
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface ISignIn {
  email: string;
  password: string;
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

  const isUpdate: boolean = Number(data.id) !== -1;

  try {
    if (isUpdate) {
      yield call(api.put, `${employeeApi}/${data.id}`, employeeData);
      Toast.fire({
        icon: "success",
        title: "Update Successfully",
      });
    } else {
      yield call(api.post, employeeApi, employeeData);
      Toast.fire({
        icon: "success",
        title: "Save Successfully",
      });
    }
    yield put(employeeActions.fetchEmployeeEntry());
  } catch (e) {
    alert("Error adding/updating user data " + e);
  }
}

function* deleteEmployee(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    yield call(api.delete, `${employeeApi}/${id}`);
    yield put(employeeActions.fetchEmployeeEntry());
    Toast.fire({
      icon: "success",
      title: "Delete Successfully",
    });
  } catch (e) {
    alert("Error deleting user data " + e);
  }
}

function* signInUser(action: PayloadAction<ISignIn>) {
  const { email, password } = action.payload;
  const userData = {
    email: email,
    password: password,
  };
  try {
    const response: AxiosResponse = yield call(
      api.post,
      userSignInApi,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      Toast.fire({
        icon: "success",
        title: "Login Successfully",
      });
      yield put(employeeActions.setAuthenticated(true));
    }
  } catch (e) {
    alert("Error signing in " + e);
  }
}

function* signOut() {
  try {
    yield put(employeeActions.setAuthenticated(false));
  } catch (e) {
    alert("Error signing out " + e);
  }
}

export function* employeeSaga() {
  yield takeLatest(employeeActions.fetchEmployeeEntry.type, fetchEmployee);
  yield takeLatest(
    employeeActions.saveAndUpdateEmployeeEntry.type,
    addAndUpdateEmployee
  );
  yield takeLatest(employeeActions.deleteEmployeeEntry.type, deleteEmployee);
  yield takeLatest(employeeActions.signIn.type, signInUser);
  yield takeLatest(employeeActions.signOut.type, signOut);
}
