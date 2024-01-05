import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMovieEntry {
  id: number;
  mName: string;
  mYear: string;
  mCategory: string;
  mDuration: string;
  mLanguage: string;
  mDirector: string;
}

interface IMovieState {
  movieEntries: IMovieEntry[];
}

const initialState: IMovieState = {
  movieEntries: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieEntries: (state, action: PayloadAction<IMovieEntry[]>) => {
      state.movieEntries = action.payload;
    },

    addMovieEntry: (state, action: PayloadAction<IMovieEntry>) => {
      const data = action.payload;
      state.movieEntries.unshift(data);
    },

    saveAndupdateMovieEntry: (state, action: PayloadAction<IMovieEntry>) => {
      const data = action.payload;
      const index = state.movieEntries.findIndex(
        (movieEntry) => movieEntry.id === data.id
      );
      state.movieEntries[index] = data;
    },

    deleteMovieEntry: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.movieEntries = state.movieEntries.filter(
        (movieEntry) => movieEntry.id !== id
      );
    },
    fetchMovieEntry: () => {},
  },
});

const movieActions = movieSlice.actions;
const movieReducer = movieSlice.reducer;

export { movieActions, movieReducer };
