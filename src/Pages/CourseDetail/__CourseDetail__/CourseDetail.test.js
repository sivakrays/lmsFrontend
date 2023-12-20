import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContextProvider } from "../../../Context/AuthContext";
import { MemoryRouter } from "react-router-dom";
import CourseDetail from "../CourseDetail";
import userEvent from "@testing-library/user-event";

describe("CourseDetailPage", () => {
  test("should render coursedetail page correctly", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <CourseDetail />
        </MemoryRouter>
      </AuthContextProvider>,
    );
  });

  test("should render all the text when readmore state change", async () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <CourseDetail />
        </MemoryRouter>
      </AuthContextProvider>,
    );

    expect(screen.getAllByTestId("list").length).toBe(8);
    await userEvent.click(screen.getByText(/show more/i));
    expect(screen.getAllByTestId("list").length).toBeGreaterThan(8);
  });
});
