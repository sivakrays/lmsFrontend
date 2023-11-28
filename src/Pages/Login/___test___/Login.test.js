import React from "react";
import { render, fireEvent, screen,cleanup } from "@testing-library/react";
import Login from "../Login";
import { MemoryRouter } from "react-router-dom";
import AxiosMock from 'axios';
import  {AuthContextProvider} from '../../../Context/AuthContext';

afterEach(cleanup);
AxiosMock.create = jest.fn(() => AxiosMock);

describe("Login Page", () => {
  test("should render Login Page with form inputs", () => {
    
   render(
    <AuthContextProvider>
       <MemoryRouter>
      <Login />
    </MemoryRouter>
    </AuthContextProvider>
   
   );
   expect(screen.queryByText(/Login/)).toBeInTheDocument();
  });

  // test("should render the login button", () => {
  //   const { getByTestId } = render(<Login />);
  //   expect(getByTestId("button")).toBeInTheDocument();
  // });
});
