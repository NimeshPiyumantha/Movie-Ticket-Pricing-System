import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import { employeeReducer } from "./employee/employeeSlice";
import { movieReducer } from "./movie/movieSlice";
import { predictReducer } from "./predict/predictSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    employeeEntries: employeeReducer,
    movieEntries: movieReducer,
    predictEntries: predictReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
