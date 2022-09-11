import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import currentReducer from "../features/current/currentSlice";
import forecastReducer from "../features/forecast/forecastSlice";
import sessionReducer from "../features/session/sessionSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      current: currentReducer,
      forecast: forecastReducer,
      session: sessionReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
