import { createContext, useState, useEffect } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedBronze = localStorage.getItem("bronze");
  const storedSilver = localStorage.getItem("silver");
  const storedGold = localStorage.getItem("gold");
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken || "");
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userID")),
  );
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [totalBronze, setTotalBronze] = useState(storedBronze || "");
  const [totalSilver, setTotalSilver] = useState(storedSilver || "");
  const [totalGold, setTotalGold] = useState(storedGold || "");

  const [user, setUser] = useState(localStorage.getItem("Current User"));

  useEffect(() => {
    if (storedToken && storedToken !== "") {
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, []);

  const updateBadgeCount = (bronze, silver, gold) => {
    localStorage.setItem("bronze", bronze);
    localStorage.setItem("silver", silver);
    localStorage.setItem("gold", gold);
    setTotalBronze(bronze);
    setTotalSilver(silver);
    setTotalGold(gold);
  };

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
        const refreshToken = JSON.stringify(res.data.refreshToken);
        res.data && localStorage.setItem("refresh token", refreshToken);
        localStorage.setItem("Current User", res.data.name);
        JSON.stringify(localStorage.setItem("userID", res.data.userId));
        localStorage.setItem("email", res.data.email);
        const parseTokenObj = JSON.parse(localToken);
        const actualToken = parseTokenObj.token;
        localStorage.setItem("Role", res.data.role);
        setUserId(res.data.userId);
        setToken(actualToken);
        setUser(res.data.name);
        setTotalBronze(res.data.bronze);
        setTotalSilver(res.data.silver);
        setTotalGold(res.data.gold);
        updateBadgeCount(res.data.bronze, res.data.silver, res.data.gold);
        successNotify();
        setIsButtonClicked(false);
        setIsTokenValid(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Errorrrrrrr", err);
        // if (err.response.status && err.response.status === 403) {
        //   errorNotify("Please provide valid credentials");
        //   setTimeout(() => {
        //     setIsButtonClicked(false);
        //   }, 500);
        // } else if (err.response.status && err.response.status === 400) {
        //   errorNotify("Bad request");
        //   setIsButtonClicked(false);
        // }

        // errorNotify(err.message);
      });
  };

  const logout = () => {
    localStorage.clear();
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
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <authContext.Provider
      value={{
        login,
        token,
        logout,
        isTokenValid,
        userId,
        user,
        isButtonClicked,
        setIsButtonClicked,
        updateBadgeCount,
        totalBronze,
        totalSilver,
        totalGold,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
