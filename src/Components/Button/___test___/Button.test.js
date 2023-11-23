import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "../Button";

describe("Button component", () => {
  test("renders button with correct text and link", () => {
    const testName = "Click Me";
    const testPath = "/example";

    render(
      <Router>
        <Button name={testName} path={testPath} />
      </Router>,
    );

    const buttonElement = screen.getByText(testName);
    expect(buttonElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: testName });
    expect(linkElement).toHaveAttribute("href", testPath);
  });
});
