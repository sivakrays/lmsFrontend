import { createContext, useState } from "react";
import { post } from "../ApiCall/ApiCall";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");

  const login = async ({ email, password, errorNotify, successNotify }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    };
    await post(`/login`, config)
      .then((res) => {
        const token = res.data.token;
        setCurrentUser(res.data);
        successNotify();
      })
      .catch((err) => {
        errorNotify();
        console.log(err);
      });
  };
  return (
    <authContext.Provider value={{ login }}>{children}</authContext.Provider>
  );
};
