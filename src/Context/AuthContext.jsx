import { createContext, useState, useEffect } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  //const [showProfile, setShowProfile] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [user, setUser] = useState("");

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
        res.data && localStorage.setItem("token", localToken);
        localStorage.setItem("Current User", res.data.name);
        localStorage.setItem("userID", res.data.userId);
        localStorage.setItem("Role", res.data.role);
        setToken(localStorage.getItem("token"));
        setUser(localStorage.getItem("Current User"));
        successNotify();
        setIsButtonClicked(false);
      })
      .catch((err) => {
        //console.log("Errorrrrrrr", err);
        if (err.response.status === 403) {
          errorNotify("Please provide valid credentials");
          setTimeout(() => {
            setIsButtonClicked(false);
          }, 500);
        } else if (err.response.status === 400) {
          errorNotify("Bad request");
          setIsButtonClicked(false);
        }

        //errorNotify(err.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token", token);
    localStorage.removeItem("Current User");
    localStorage.removeItem("userID");
    localStorage.removeItem("Role");
    setToken("");
    setIsTokenValid(false);
    //setShowProfile(false);
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
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // const handleClickOutlet = () => {
  //   setShowProfile(false);
  // };
  return (
    <authContext.Provider
      value={{
        login,
        token,
        logout,
        isTokenValid,
        //showProfile,
        //setShowProfile,
        //handleClickOutlet,
        user,
        isButtonClicked,
        setIsButtonClicked,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
