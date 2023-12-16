import { createContext, useState, useEffect } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
        const localToken = JSON.stringify(res.data.token);
        console.log("Local Token", localToken);
        res.data && localStorage.setItem("token", localToken);
        // const username = res.data && res.data.username.split('@');
        // localStorage.setItem("userName",username[0]);
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
    setShowProfile(false);
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
  const handleProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleClickOutlet = () => {
    setShowProfile(false);
  };
  return (
    <authContext.Provider
      value={{
        login,
        token,
        logout,
        isTokenValid,
        handleProfile,
        showProfile,
        handleClickOutlet,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
