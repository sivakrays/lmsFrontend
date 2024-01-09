import React from "react";
import { render } from "@testing-library/react";
import MyVideo from "./MyVideo";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../../Context/AuthContext";

describe("My video page", () => {
  test("should render MyVideo render correctly", () => {
    const { getByTestId } = render(
      <AuthContextProvider>
        <MemoryRouter>
          <MyVideo />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(getByTestId("accordion")).toBeInTheDocument();
  });
});
