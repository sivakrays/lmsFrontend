// Contact.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact Page", () => {
  test(" should render Contact page with form inputs", () => {
    render(<Contact />);

    // Ensure form inputs are rendered
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  test("handles form submission correctly", () => {
    render(<Contact />);

    // Mock API calls or form submission function
    // Trigger form submission and assert the expected behavior
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    // Add assertions based on the expected behavior after submission
  });
});

// Add more test cases based on your component's functionality
