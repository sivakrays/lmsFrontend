import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CourseCard from "../CourseCard";

const courseTestData = {
  img: "example.jpg",
  category: "Programming",
  title: "Introduction to React",
  des: "Learn the basics of React.js",
};

describe("CourseCard component", () => {
  test("renders course card with correct content", () => {
    render(
      <Router>
        <CourseCard course={courseTestData} />
      </Router>,
    );
    const courseHeading = screen.getByText(courseTestData.title);
    const courseCategory = screen.getByText(courseTestData.category);
    const courseDescription = screen.getByText(courseTestData.des);

    expect(courseHeading).toBeInTheDocument();
    expect(courseCategory).toBeInTheDocument();
    expect(courseDescription).toBeInTheDocument();

    const joinButton = screen.getByText("Join");
    expect(joinButton).toBeInTheDocument();

    const enrollmentCount = screen.getByText("12345");
    const enrollmentLabel = screen.getByText("Enroled");

    expect(enrollmentCount).toBeInTheDocument();
    expect(enrollmentLabel).toBeInTheDocument();
  });
});
