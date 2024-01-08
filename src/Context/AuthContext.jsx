import { createContext, useState, useEffect } from "react";
import { post } from "../ApiCall/ApiCall";
import { toast } from "react-toastify";
export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedBronze = localStorage.getItem("bronze");
  const storedSilver = localStorage.getItem("silver");
  const storedGold = localStorage.getItem("gold");

  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [totalBronze, setTotalBronze] = useState(storedBronze || 0);
  const [totalSilver, setTotalSilver] = useState(storedSilver || 0);
  const [totalGold, setTotalGold] = useState(storedGold || 0);

  const [user, setUser] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("totalBronze", totalBronze.toString());
  //   localStorage.setItem("totalSilver", totalSilver.toString());
  //   localStorage.setItem("totalGold", totalGold.toString());
  // }, [totalBronze, totalSilver, totalGold]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("storedtoken", storedToken);

    if (storedToken && storedToken !== "") {
      setToken(storedToken);
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  const updateBadgeCount = (bronze, silver, gold) => {
    console.log("badges b,s,g", bronze, silver, gold);
    // setTotalBronze(bronze);
    // setTotalSilver(silver);
    // setTotalGold(gold);
    localStorage.setItem("bronze", bronze);
    localStorage.setItem("silver", silver);
    localStorage.setItem("gold", gold);
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
        localStorage.setItem("Current User", res.data.name);
        localStorage.setItem("userID", res.data.userId);
        const parseTokenObj = JSON.parse(localToken);
        const actualToken = parseTokenObj.token;
        setToken(actualToken);
        setUser(localStorage.getItem("Current User"));
        setTotalBronze(res.data.bronze);
        setTotalSilver(res.data.silver);
        setTotalGold(res.data.gold);
        updateBadgeCount(res.data.bronze, res.data.silver, res.data.gold);
        successNotify();
        setIsButtonClicked(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Errorrrrrrr", err);
        if (err.response.status && err.response.status === 403) {
          errorNotify("Please provide valid credentials");
          setTimeout(() => {
            setIsButtonClicked(false);
          }, 500);
        } else if (err.response.status && err.response.status === 400) {
          errorNotify("Bad request");
          setIsButtonClicked(false);
        }

        errorNotify(err.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token", token);
    localStorage.removeItem("Current User");
    localStorage.removeItem("userID");
    // localStorage.removeItem("bronze");
    // localStorage.removeItem("silver");
    // localStorage.removeItem("gold");
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
        updateBadgeCount,
        totalBronze,
        totalSilver,
        totalGold,

        // setIsBadgeUpdate,
        // isBadgeUpdate,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
