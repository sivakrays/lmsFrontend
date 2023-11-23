import React from "react";
import { render } from "@testing-library/react";
import Modal from "../Modal";

describe("Home component", () => {
  test("renders Modal component", () => {
    render(<Modal />);
  });
});
