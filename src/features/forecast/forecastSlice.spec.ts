import forecastReducer, {
   ForecastState,
   increment,
   decrement,
   incrementByAmount,
} from "./forecastSlice";

describe("forecast reducer", () => {
   const initialState: ForecastState = {
      value: 3,
      status: "idle",
   };
   it("should handle initial state", () => {
      expect(forecastReducer(undefined, { type: "unknown" })).toEqual({
         value: 0,
         status: "idle",
      });
   });

   it("should handle increment", () => {
      const actual = forecastReducer(initialState, increment());
      expect(actual.value).toEqual(4);
   });

   it("should handle decrement", () => {
      const actual = forecastReducer(initialState, decrement());
      expect(actual.value).toEqual(2);
   });

   it("should handle incrementByAmount", () => {
      const actual = forecastReducer(initialState, incrementByAmount(2));
      expect(actual.value).toEqual(5);
   });
});
