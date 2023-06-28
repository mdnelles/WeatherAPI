import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
   test("renders the Data, Github, and ImageBG components", () => {
      const { getByTestId } = render(<App />);

      const dataComponent = getByTestId("data-component");
      expect(dataComponent).toBeInTheDocument();

      const githubComponent = getByTestId("github-component");
      expect(githubComponent).toBeInTheDocument();

      const imageBGComponent = getByTestId("imagebg-component");
      expect(imageBGComponent).toBeInTheDocument();
   });
});
