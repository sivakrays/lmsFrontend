import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import LearningCard from "../LearningCard";
import "@testing-library/jest-dom";
import MyVideo from "../../../Pages/MyLearnings/MyVideo";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Learning Component", () => {
  const cardDetails = [
    {
      key: 1,
      image: "https://img-c.udemycdn.com/course/750x422/5039162_eb97_5.jpg",
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
    {
      key: 2,
      image:
        "https://us.123rf.com/450wm/jaaakworks/jaaakworks1511/jaaakworks151100024/47825772-cartoon-business-team-steal-money-from-boss.jpg?ver=6",
      title: "Financial Foundations for Kids & Money Management",
      author: "Amelia Bright",
    },
    {
      key: 3,
      image:
        "https://bookstr.com/wp-content/uploads/2023/04/childrens-financial-literacy-featured-image-750x400.jpg",
      title: "Money Matters Junior and Teenagers Course",
      author: "Emma Dollarwise",
    },
    {
      key: 4,
      image: "https://tm4k.ala.org/images/background.jpg",
      title: "Junior Money Management and Financial Foundations for Kids",
      author: "Oliver Pennyfield",
    },
  ];

  const accordionDetails = {
    courseId: 3253,
    title: "Website development",
    authorName: "Mark Antony",
    description: "hello world.",
    thumbNail: "string",
    enrolled: 12,
    category: "Programming",
    ratings: 5,
    language: "english",
    overview: "good",
    whatYouWillLearn:
      "The Complete Personal Finance for Kids and Teenagers Course by Steeve Simbert is a comprehensive, engaging, and fun online program, designed to boost the financial literacy of the younger generation. It uses entertaining animated cartoon videos to simplify complex financial, business, and economic concepts, covering everything from basic personal finance to investment strategies and retirement savings.",

    price: 20000,
    date: "2023-12-16T00:00:00.000+00:00",
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
      {
        sectionId: 2354,
        key: 2,
        title: "Personal Finance",
        subSections: [
          {
            subSectionId: 1,
            key: 2,
            title: "Personal Finance",
            description:
              "If you want to be better than you are today, you must do something to improve yourself.",
            link: "https://www.youtube.com/watch?v=CaAuFwJJ8sA",
            quizList: [
              {
                quizId: 1,
                title: "Personal Finance",
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
          {
            subSectionId: 2,
            key: 2,
            title: "Finance",
            description:
              "If you want to be better than you are today, you must do something to improve yourself.",
            link: "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
            quizList: [
              {
                quizId: 1,
                title: "Finance",
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

  test("should render LearningCard", () => {
    render(<LearningCard cardDetails={cardDetails} />);
    expect(screen.getByTestId("learningCard")).toBeInTheDocument();
  });
});
