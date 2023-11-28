import React from "react";
import { render, cleanup } from "@testing-library/react";
import Signup from "../Signup";
import AxiosMock from "axios";
import {AuthContextProvider}  from '../../../Context/AuthContext';
import { MemoryRouter } from "react-router-dom";
 

afterEach(cleanup);
// Mock the signUp function from the AuthContext
 AxiosMock.create =  jest.fn(()=>AxiosMock)
describe("Signup page", () => {
  test("should render Signup page with form inputs", () => {
    render(
        <AuthContextProvider>
            <MemoryRouter>
                  <Signup/>
            </MemoryRouter>
          
        </AuthContextProvider>
    );
  });
});
