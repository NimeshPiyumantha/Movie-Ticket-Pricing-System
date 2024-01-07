import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMovieEntry {
  id: string;
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

    saveAndUpdateMovieEntry: (state, action: PayloadAction<IMovieEntry>) => {
      const data = action.payload;
      const index = state.movieEntries.findIndex(
        (movieEntry) => movieEntry.id === data.id
      );
      state.movieEntries[index] = data;
    },

    deleteMovieEntry: (state, action: PayloadAction<string>) => {
      const id = action.payload.toString();
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
