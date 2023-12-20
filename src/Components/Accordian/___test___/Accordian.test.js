import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Accordion from "../Accordian";
import userEvent from "@testing-library/user-event";
import Modal from "../../Modal/Modal";

const accordianDetails = {
  sections: [
    {
      sectionId: 2353,
      key: 1,
      title: "Introduction",
      subSections: [
        {
          subSectionId: 1,
          key: 1,
          title: "Introduction",
          description:
            "If you want to be better than you are today, you must do something to improve yourself.",
          link: "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
          quizList: null,
        },
        {
          subSectionId: 2,
          key: 2,
          title: "Invest Yourself",
          description:
            "If you want to be better than you are today, you must do something to improve yourself.",
          link: "https://www.youtube.com/watch?v=CaAuFwJJ8sA",
          quizList: [
            {
              quizId: 1,
              title: "Invest Yourself",
              key: 1,
              question: "What does invest in yourself mean?",
              options: [
                "Working to improve your skills and knowledge to give yourself a better future.",
                "Spending all your money to buy delicious treats.",
                "Using most of your money to buy expensive things that you like.",
                "Delaying a task that you are supposed to do.",
              ],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
};

describe("Accordian Component", () => {
  test("should render accordian items with initial state", () => {
    const { getByText, getByTestId } = render(
      <Accordion
        accordianDetails={accordianDetails.sections}
        isAllOpen={false}
      />,
    );
    accordianDetails.sections.forEach((item) => {
      expect(getByTestId("accordion-item")).toBeInTheDocument();
    });
  });

  test("toggles accordion visibility on click", async () => {
    const { getAllByText, queryAllByText } = render(
      <Accordion
        accordianDetails={accordianDetails.sections}
        isAllOpen={false}
      />,
    );

    await accordianDetails.sections.forEach(async (item) => {
      // Click on the accordion to expand it
      fireEvent.click(getAllByText(item.title)[0]);

      // Check if the nested accordion content is now visible, only if previewText is defined
      if (item.subSections[0].description) {
        await waitFor(() => {
          const nestedElements = queryAllByText(
            item.subSections[0].description,
          );
          expect(nestedElements).toHaveLength(1);

          nestedElements.forEach((element) => {
            expect(element).toBeInTheDocument();
          });
        });
      }
      // Log the current state of the DOM
      console.log("After click to expand:", document.body.innerHTML);

      // Click again to collapse the accordion
      fireEvent.click(getAllByText(item.title)[0]);

      await waitFor(() => {
        // Log the current state of the DOM
        console.log("After click to collapse:", document.body.innerHTML);

        // Check if the nested accordion content is hidden again, only if previewText is defined
        if (item.subSections[0].description) {
          const nestedElements = queryAllByText(
            item.subSections[0].description,
          );
          expect(nestedElements).toHaveLength(0);

          nestedElements.forEach((element) => {
            expect(element).not.toBeInTheDocument();
          });
        }
      });
    });
  });

  test("should render modal when click icon, title and preview", () => {
    const { queryByText } = render(<Modal />);
    const { getAllByText } = render(
      <Accordion
        accordianDetails={accordianDetails.sections}
        isAllOpen={false}
      />,
    );
    accordianDetails.sections.forEach((item) => {
      fireEvent.click(getAllByText(item.subSections[0].title)[0]);
      waitFor(() => {
        expect(queryByText(/course preview/i)).toBeInTheDocument();
      });
    });
  });
});
