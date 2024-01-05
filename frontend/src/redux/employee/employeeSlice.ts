import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEmployeeEntry {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IEmployeeState {
  employeeEntries: IEmployeeEntry[];
}

const initialState: IEmployeeState = {
  employeeEntries: [],
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
        (userEntry) => userEntry.email === data.email
      );
      state.employeeEntries[index] = data;
    },
    fetchEmployeeEntry: () => {},
    setUserEntries: (state, action: PayloadAction<IEmployeeEntry[]>) => {
      state.employeeEntries = action.payload;
    },
    deleteEmployeeEntry: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.employeeEntries = state.employeeEntries.filter(
        (userEntry) => userEntry.email !== email
      );
    },
  },
});

const employeeActions = employeeSlice.actions;
const employeeReducer = employeeSlice.reducer;

export { employeeActions, employeeReducer };
