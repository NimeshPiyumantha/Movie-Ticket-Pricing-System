import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEmployeeEntry {
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

interface ISignInData {
  email: string;
  password: string;
}

interface IEmployeeState {
  employeeEntries: IEmployeeEntry[];
  isAuthenticated: boolean;
}

const initialState: IEmployeeState = {
  employeeEntries: [],
  isAuthenticated: true,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployeeEntry: (state, action: PayloadAction<IEmployeeEntry>) => {
      const data = action.payload;
      state.employeeEntries.unshift(data);
    },
    saveAndUpdateEmployeeEntry: (
      state,
      action: PayloadAction<IEmployeeEntry>
    ) => {
      const data = action.payload;
      const index = state.employeeEntries.findIndex(
        (userEntry) => userEntry.id === data.id
      );
      state.employeeEntries[index] = data;
    },
    fetchEmployeeEntry: () => {},
    setUserEntries: (state, action: PayloadAction<IEmployeeEntry[]>) => {
      state.employeeEntries = action.payload;
    },
    deleteEmployeeEntry: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.employeeEntries = state.employeeEntries.filter(
        (userEntry) => userEntry.id !== id
      );
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    signIn(state, action: PayloadAction<ISignInData>) {},
    signOut(state) {},
  },
});

const employeeActions = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;

export { employeeActions, employeeReducer };
