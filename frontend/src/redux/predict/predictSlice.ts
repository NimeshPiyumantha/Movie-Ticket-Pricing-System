import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPredictEntry {
  tickets_out: number;
  capacity: number;
  month: number;
  day: number;
}
interface IPredictState {
  predictEntries: IPredictEntry[];
  ticket_price: number;
}
const initialState: IPredictState = {
  predictEntries: [],
  ticket_price: 0,
};

export const predictSlice = createSlice({
  name: "predict",
  initialState,
  reducers: {
    addPredictEntry: (state, action: PayloadAction<IPredictEntry>) => {
      const data = action.payload;
      state.predictEntries.unshift(data);
    },
    setTicketPrice: (state, action: PayloadAction<number>) => {
      state.ticket_price = action.payload;
    },
    clearTicketPrice: (state) => {
      state.ticket_price = 0;
    },
  },
});

const predictActions = predictSlice.actions;
const predictReducer = predictSlice.reducer;

export { predictActions, predictReducer };
