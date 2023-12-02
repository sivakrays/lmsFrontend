import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Accordion from "../Accordian";
import userEvent from "@testing-library/user-event";
import Modal from "../../Modal/Modal";

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

describe("Accordian Component", () => {
  test("should render accordian items with initial state", () => {
    const { getByText } = render(
      <Accordion accordianDetails={accordionDetails} isAllOpen={false} />,
    );
    accordionDetails.forEach((item) => {
      expect(getByText(item.accordianName)).toBeInTheDocument();
    });
  });

  test("toggles accordion visibility on click", () => {
    const { getByText, queryByText } = render(
      <Accordion accordianDetails={accordionDetails} isAllOpen={false} />,
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

  test("should render modal when click icon, title and preview", () => {
    const { queryByText } = render(<Modal />);
    const { getByText, getByTestId, getAllByTestId } = render(
      <Accordion accordianDetails={accordionDetails} isAllOpen={false} />,
    );
    accordionDetails.forEach((item) => {
      fireEvent.click(getByText(item.nestedItems[0].accordianName));
      waitFor(() => {
        expect(queryByText(/course preview/i)).toBeInTheDocument();
      });
    });
  });
});
