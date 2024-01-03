import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Quiz from "../Quiz";

describe("Quiz Component", () => {
  test("renders quiz questions and options", () => {
    render(
      <Quiz
        setRewardModal={() => {}}
        energyPoint={0}
        setEnergyPoint={() => {}}
      />,
    );
  });
});
