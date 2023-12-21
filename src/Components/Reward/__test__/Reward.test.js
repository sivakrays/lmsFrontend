import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Reward from "../Reward";

describe("Reward Component", () => {
  test("renders reward card with Bronze Medal when energyPoint is 1", () => {
    render(<Reward setRewardModal={() => {}} energyPoint={1} />);
  });

  test("calls setRewardModal when the close button is clicked", () => {
    const mockSetRewardModal = jest.fn();
    render(<Reward setRewardModal={mockSetRewardModal} energyPoint={1} />);
    fireEvent.click(screen.getByTestId("close"));
    expect(mockSetRewardModal).toHaveBeenCalled();
  });
});
