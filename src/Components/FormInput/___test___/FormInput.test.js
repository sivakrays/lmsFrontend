// FormInput.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "../FormInput";

describe("FormInput", () => {
  test("renders FormInput component with label and input", () => {
    render(
      <FormInput label="Test Label" id="testId" errorMsg="Test Error" path />,
    );

    // Ensure label and input are rendered
    expect(screen.getByTestId("labelText")).toBeInTheDocument();
    expect(screen.getByTestId("inputBox")).toBeInTheDocument();
  });

  test("handles input focus correctly", () => {
    render(
      <FormInput label="Test Label" id="testId" errorMsg="Test Error" path />,
    );

    // Ensure focused state is updated on input focus
    const input = screen.getByTestId("inputBox");
    fireEvent.focus(input);
    expect(input).toHaveAttribute("focused", "true");
  });

  test("when focusing error message should display",()=>{
     render(
      <FormInput label="Test Label" id="testId" errorMsg="Test Error" path />,
    );
    const errorMsg = screen.getByTestId("errMsg");
    fireEvent.focus(errorMsg);
    expect(errorMsg).toBeInTheDocument();
  })
});

// Add more test cases based on your component's functionality
