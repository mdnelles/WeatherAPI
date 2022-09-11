import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface SessionState {
   city: string;
   status: "idle" | "loading" | "failed";
}

const initialState: SessionState = {
   city: "Miami",
   status: "idle",
};

export const sessionSlice = createSlice({
   name: "session",
   initialState,
   // The `reducers` field lets us define reducers and generate associated actions
   reducers: {
      update: (state, action: PayloadAction<any>) => {
         const { city } = action.payload;
         state.city = city;
      },
      reset: () => initialState,
   },
});

export const { update, reset } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
