import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CourseCard from "../CourseCard";
import { AuthContextProvider } from "../../../Context/AuthContext";

const courseTestData = {
  img: "example.jpg",
  category: "Programming",
  title: "Introduction to React",
  des: "Learn the basics of React.js",
};

describe("CourseCard component", () => {
  test("renders course card with correct content", () => {
    render(
      <AuthContextProvider>
        <Router>
          <CourseCard course={courseTestData} path="homeCard" />
        </Router>
      </AuthContextProvider>,
    );
    const courseHeading = screen.getByText(courseTestData.title);
    const courseCategory = screen.getByText(courseTestData.category);
    // const courseDescription = screen.getByText(courseTestData.des);

    expect(courseHeading).toBeInTheDocument();
    expect(courseCategory).toBeInTheDocument();
    // expect(courseDescription).toBeInTheDocument();

    const joinButton = screen.getByText("Join");
    expect(joinButton).toBeInTheDocument();

    // const enrollmentLabel = screen.getByText("Enrolled");
    // expect(enrollmentLabel).toBeInTheDocument();
  });
});
