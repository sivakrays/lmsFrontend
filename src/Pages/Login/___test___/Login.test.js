import React from "react";
import { render, fireEvent, screen,cleanup,waitFor } from "@testing-library/react";
import Login from "../Login";
import { MemoryRouter } from "react-router-dom";
import  {AuthContextProvider} from '../../../Context/AuthContext';
import {post} from '../../../ApiCall/ApiCall';

afterEach(cleanup);
jest.mock('../../../ApiCall/ApiCall');

 jest.mock("react-toastify", () => ({
  ToastContainer: jest.fn(),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
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

  test("should render the login button", () => {
    const { getByTestId } =  render(
    <AuthContextProvider>
       <MemoryRouter>
      <Login />
    </MemoryRouter>
    </AuthContextProvider>
   
   );
    expect(getByTestId("login")).toBeInTheDocument();
  });
   test("should make apicall when the form is submit",async()=>{
     post.mockResolvedValueOnce({ res: {"msg":"Login Successfull"} });

    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContextProvider>
    );
     // Simulate user input
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
   // Trigger form submission
    fireEvent.submit(screen.getByRole("button", { name: /login/i }));
// Wait for the API call to be made
    await waitFor(() => {
      
     const url = '/login'
      

        const config = {
         headers: {
          email:"john.doe@example.com",
          password:"password123"
      },
        };
      expect(post).toHaveBeenCalledWith(url,{},config);
  })
 
});
});
