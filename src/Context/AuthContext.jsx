import { createContext, useState, useEffect } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedToken !== "") {
      setToken(storedToken);
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);
  const login = async ({ email, password }) => {
    const config = {
      headers: {
        email: email,
        password: password,
      },
    };

    await post(`/auth/login`, {}, config)
      .then((res) => {
        res.data && localStorage.setItem("token", res.data.token);
        setToken(localStorage.getItem("token"));
        successNotify();
      })
      .catch((err) => {
        console.log("Errorrrrrrr", err);
        errorNotify(err.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token", token);
    setToken("");
    setIsTokenValid(false);
  };

  const successNotify = () =>
    toast.success("Login Successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorNotify = (err) =>
    toast.error(err, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <authContext.Provider value={{ login, token, logout, isTokenValid }}>
      {children}
    </authContext.Provider>
  );
};
