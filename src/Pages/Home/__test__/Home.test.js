import { render } from "@testing-library/react";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../../../Context/AuthContext";

describe("Home Page", () => {
  test("Should render the Home Page", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContextProvider>,
    );
  });
});
