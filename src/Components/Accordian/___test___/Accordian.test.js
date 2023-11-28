import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Accordion from "../Accordian";

describe("Accordian Component", () => {
  test("should render accordian items with initial state", () => {
    const accordionDetails = [
      {
        key: "1",
        accordianName: "Accordion 1",
        nestedItems: [
          {
            key: "1.1",
            accordianName: "Nested Accordion 1.1",
            previewText: "Preview text for Nested Accordion 1.1",
          },
        ],
      },
      {
        key: "2",
        accordianName: "Accordion 2",
        nestedItems: [
          {
            key: "2.1",
            accordianName: "Nested Accordion 2.1",
            previewText: "Preview text for Nested Accordion 2.1",
          },
        ],
      },
    ];

    const { getByText } = render(
      <Accordion accordianDetails={accordionDetails} />,
    );
    accordionDetails.forEach((item) => {
      expect(getByText(item.accordianName)).toBeInTheDocument();
    });
  });

  test("toggles accordion visibility on click", () => {
    const accordionDetails = [
      {
        key: "1",
        accordianName: "Accordion 1",
        nestedItems: [
          {
            key: "1.1",
            accordianName: "Nested Accordion 1.1",
            previewText: "Preview text for Nested Accordion 1.1",
          },
        ],
      },
      {
        key: "2",
        accordianName: "Accordion 2",
        nestedItems: [
          {
            key: "2.1",
            accordianName: "Nested Accordion 2.1",
            previewText: "Preview text for Nested Accordion 2.1",
          },
        ],
      },
    ];

    const { getByText, queryByText } = render(
      <Accordion accordianDetails={accordionDetails} />,
    );

    accordionDetails.forEach((item) => {
      // Click on the accordion to expand it
      fireEvent.click(getByText(item.accordianName));

      // Check if the nested accordion content is now visible, only if previewText is defined
      if (item.previewText) {
        expect(queryByText(item.previewText)).toBeInTheDocument();
      }

      // Click again to collapse the accordion
      fireEvent.click(getByText(item.accordianName));

      // Check if the nested accordion content is hidden again, only if previewText is defined
      if (item.previewText) {
        expect(queryByText(item.previewText)).toBeNull();
      }
    });
  });
});
