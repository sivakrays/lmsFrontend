import { createContext, useContext, useState } from "react";
import { post } from "../ApiCall/ApiCall";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const signUp = async ({ fullName, email, password, confirmPassword }) => {
    console.log("signup called");
    //API Call
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const httpBody = {
      data: {
        name: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    };
    await post(`/register`, httpBody, config).then((res) =>
      console.log("Register Successfuly"),
    );
  };

  const login = async ({ email, password }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await post(`/login?email=${email}&password=${password}`, config).then(
      (res) => setCurrentUser(res.data),
    );
  };
  return (
    <authContext.Provider value={{ signUp, login }}>
      {children}
    </authContext.Provider>
  );
};
export const useMyContext = () => useContext(authContext);
