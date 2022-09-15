import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
//import { fetchCurrent } from './currentAPI';

export interface CurrentState {
   value: any;
   status: "idle" | "loading" | "failed";
}

const initialState: CurrentState = {
   value: {
      coord: {
         lon: -80.1937,
         lat: 25.7743,
      },
      weather: [
         {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
         },
      ],
      base: "stations",
      main: {
         temp: 82.47,
         feels_like: 90.54,
         temp_min: 79,
         temp_max: 84.02,
         pressure: 1014,
         humidity: 82,
      },
      visibility: 10000,
      wind: {
         speed: 7,
         deg: 140,
         gust: 0,
      },
      clouds: {
         all: 75,
      },
      dt: 1662797730,
      sys: {
         type: 2,
         id: 2009435,
         country: "US",
         sunrise: 1662807886,
         sunset: 1662852664,
      },
      timezone: -14400,
      id: 4164138,
      name: "Miami",
      cod: 200,
   },
   status: "idle",
};

export const currentSlice = createSlice({
   name: "current",
   initialState,
   reducers: {
      update: (state, action: PayloadAction<any>) => {
         state = action.payload;
      },
      reset: () => initialState,
   },
});

export const { update, reset } = currentSlice.actions;

export const selectCurrent = (state: RootState) => state.current.value;

export default currentSlice.reducer;
