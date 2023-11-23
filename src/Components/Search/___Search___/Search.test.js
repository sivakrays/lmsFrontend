import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

test("renders search input and handles search button click", () => {
  const { getByLabelText, getByTestId } = render(<Search />);

  const searchInput = getByLabelText("Search");
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "test" } });
  expect(searchInput.value).toBe("test");

  const searchButton = getByTestId("Search");
  expect(searchButton).toBeInTheDocument();
  fireEvent.click(searchButton);
});
