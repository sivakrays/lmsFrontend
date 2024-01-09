import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Modal from "../Modal";

describe("Modal Component", () => {
  const mockToggleModal = jest.fn();
  const mockToggleModal1 = jest.fn();
  const mockHandleAccept = jest.fn();

  const quiz = [
    {
      id: 1,
      title: "Finance Quiz-1",
      question: "What is the basic unit of currency in the United States?",
      options: ["Dollar", "Euro", "Yen"],
    },
  ];

  test("renders modal content", () => {
    render(
      <Modal
        toggleModal={mockToggleModal}
        isModalOpen
        setIsModalOpen={() => {}}
        handleAccept={mockHandleAccept}
        quiz={quiz}
        quiztitle="Quiz-1"
        isModalOpen1
        toggleModal1={mockToggleModal1}
        path="/some-path"
      />,
    );

    expect(screen.getByText("Course Preview")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The Complete Personal Finance for Kids and Teenagers Course",
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("video-player")).toBeInTheDocument();
  });

  // test("closes Modal 1 when X button is clicked", () => {
  //   render(
  //     <Modal
  //       toggleModal={mockToggleModal}
  //       isModalOpen
  //       setIsModalOpen={() => {}}
  //       handleAccept={mockHandleAccept}
  //       quiz={quiz}
  //       quiztitle="Quiz-1"
  //       isModalOpen1
  //       toggleModal1={mockToggleModal1}
  //       path="/some-path"
  //     />,
  //   );

  //   fireEvent.click(screen.getByTestId("close"));
  //   expect(mockToggleModal1).toHaveBeenCalled();
  // });

  // test("clicking Resume button triggers handleAccept", () => {
  //   render(
  //     <Modal
  //       toggleModal={mockToggleModal}
  //       isModalOpen
  //       setIsModalOpen={() => {}}
  //       handleAccept={mockHandleAccept}
  //       quiz={quiz}
  //       quiztitle="Quiz-1"
  //       isModalOpen1
  //       toggleModal1={mockToggleModal1}
  //       path="/some-path"
  //     />,
  //   );

  //   fireEvent.click(screen.getByText("Resume"));
  //   expect(mockHandleAccept).toHaveBeenCalled();
  // });
});
