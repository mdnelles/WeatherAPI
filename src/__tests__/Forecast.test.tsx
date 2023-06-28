import React from "react";
import { render } from "@testing-library/react";
import Forecast from "../components/Forecast";

test("renders Forecast component", () => {
   const props = {
      icon: "01d",
      date: "Feb 30",
      high: 85,
      low: 70,
      unit: "Fahrenheit",
      duration: 1,
   };

   const { getByText } = render(<Forecast {...props} />);

   // Assert that the component renders the date
   expect(getByText("Feb 30")).toBeInTheDocument();

   // Assert that the component renders the high temperature
   expect(getByText("85 F")).toBeInTheDocument();

   // Assert that the component renders the low temperature
   expect(getByText("70 F")).toBeInTheDocument();

   // Add more assertions as needed to test the component behavior
});
