import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Data from "../components/Data";

// Create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
   forecast: {
      value: {
         list: [
            {
               main: {
                  temp: 25,
                  humidity: 60,
                  pressure: 1013,
               },
               wind: {
                  speed: 5,
               },
               weather: [
                  {
                     icon: "01d",
                     description: "Clear sky",
                  },
               ],
            },
         ],
         city: {
            name: "Sample City",
         },
      },
   },
   session: {
      city: "Sample City",
      unit: "Fahrenheit",
   },
});

test("renders Data component", () => {
   const { getByText } = render(
      <Provider store={store}>
         <Data />
      </Provider>
   );

   // Assert that the component renders the city name
   expect(getByText("Sample City")).toBeInTheDocument();

   // Add more assertions as needed to test the component behavior
});
