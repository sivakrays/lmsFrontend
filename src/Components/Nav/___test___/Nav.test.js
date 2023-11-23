import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Nav from "../Nav";

describe("Navbar component", () => {
  test("renders Navbar with correct links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nav />
      </MemoryRouter>,
    );

    const homeLinks = screen.getAllByText(/Home/i);

    homeLinks.forEach((homeLink) => {
      expect(homeLink).toBeInTheDocument();
    });

    const featuredCoursesLinks = screen.getAllByText(/Featured Courses/i);

    featuredCoursesLinks.forEach((featuredCoursesLink) => {
      expect(featuredCoursesLink).toBeInTheDocument();
    });

    const testimonialsLinks = screen.getAllByText(/Testimonials/i);

    testimonialsLinks.forEach((testimonialsLink) => {
      expect(testimonialsLink).toBeInTheDocument();
    });

    const contactLinks = screen.getAllByText(/Contact/i);

    contactLinks.forEach((contactLink) => {
      expect(contactLink).toBeInTheDocument();
    });
  });

  test("toggles mobile menu when the button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Nav />
      </MemoryRouter>,
    );

    const mobileMenu = screen.getByTestId("mobile_menu");
    const toggleButton = screen.getByTestId("toggleBtn");

    expect(mobileMenu).toHaveStyle({
      top: expect.stringMatching(/^-?\d*\.?\d*%$/),
    });

    fireEvent.click(toggleButton);

    expect(mobileMenu).toHaveStyle({
      top: expect.stringMatching(/^\d*\.?\d*%$/),
    });

    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveStyle({
      top: expect.stringMatching(/^-?\d*\.?\d*%$/),
    });
  });
});
