import { createContext, useState } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isvalid, setIsValid] = useState(true);

  const login = async ({ email, password }) => {
    const config = {
      headers: {
        email: email,
        password: password,
      },
    };

    await post(`/login`, {}, config)
      .then((res) => {
        res.data && setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        successNotify();
      })
      .catch((err) => {
        console.log("Errorrrrrrr", err);
        errorNotify(err.message);
      });
  };

  console.log("settoken", token);
  console.log("isvalid from authcontext", isvalid);

  const logout = () => {
    setToken(" ");
    localStorage.removeItem("token", token);
  };

  const successNotify = () =>
    toast.success("Register Successfully!", {
      position: "top-right",
      autoClose: 5000,
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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <authContext.Provider value={{ login, token, logout }}>
      {children}
    </authContext.Provider>
  );
};
