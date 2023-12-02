import { post } from "../../../ApiCall/ApiCall";
import React from "react";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Signup from "../Signup";
import { AuthContextProvider } from "../../../Context/AuthContext";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock("../../../ApiCall/ApiCall");
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Signup page", () => {
  test("should render Signup page with form inputs", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(screen.queryByText(/Signup/)).toBeInTheDocument();
  });

  test("should render Signup button", () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(screen.queryByTestId("signupbutton")).toBeInTheDocument();
  });

  test("should make apicall without error when the form is submit", async () => {
    post.mockResolvedValueOnce({ res: { msg: "Registered Successfully" } });

    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    // Simulate user input
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Paasword"), {
      target: { value: "password123" },
    });
    // Trigger form submission
    fireEvent.submit(screen.getByRole("button", { name: /signup/i }));
    // Wait for the API call to be made
    await waitFor(() => {
      const url = "/auth/register";
      const data = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      expect(post).toHaveBeenCalledWith(url, data, config);
      // Wait for the navigation to occur after the success notification
      waitFor(() => {
        expect(screen.getByTestId("toast")).toBeInTheDocument();
        expect(screen.getByTestId("signupbutton")).toBeInTheDocument();
      });
    });
    // Use await with setTimeout
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    //jest.setTimeout(1000);
    // Assertions after the timeout
    // expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    // expect(screen.queryByTestId('signupbutton')).not.toBeInTheDocument();
    //expect(window.location.pathname).toBe("/login");
  });
});
