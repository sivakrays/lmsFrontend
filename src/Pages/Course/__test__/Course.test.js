import { render } from "@testing-library/react";
import Course from "../Course";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../../Context/AuthContext";

describe("Course Page", () => {
  test("Should render the Course page", () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Course />
        </BrowserRouter>
      </AuthContextProvider>,
    );
  });
});
