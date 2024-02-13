import { createContext, useContext, useEffect, useState } from "react";
import img from "../Assets/Home/course1.jpg";
import { get } from "../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../utils/RefreshToken/RefreshToken";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { token, userId } = useContext(authContext);

  const [total, setTotal] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartData, setCartData] = useState([]);

  const [cartUpdated, setCartUpdated] = useState(false);

  const appToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (appToken) {
          const refreshedToken = await checkAndRefreshToken(
            JSON.parse(appToken),
          );
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshedToken}`,
              userId: userId,
            },
          };

          const res = await get("/user/getCartByUserId", config);
          setCartData(res.data);
          console.log("get all response", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartData();
  }, [cartUpdated]);

  useEffect(() => {
    setTotalCartItem(cartData.length);
    const calculatedTotal =
      cartData && cartData.reduce((acc, cart) => acc + cart.price, 0);
    setTotal(calculatedTotal);
  }, [cartData]);

  return (
    <cartContext.Provider
      value={{
        cartData,
        total,
        setTotal,
        totalCartItem,
        setTotalCartItem,
        setCartUpdated,
        cartUpdated,
        setCartData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
