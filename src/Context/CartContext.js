import { createContext, useContext, useEffect, useState } from "react";
import img from "../Assets/Home/course1.jpg";
import { get } from "../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../utils/RefreshToken/RefreshToken";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { userId, token } = useContext(authContext);

  const [total, setTotal] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartData, setCartData] = useState([]);

  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const refreshedToken = await checkAndRefreshToken(JSON.parse(token));
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${refreshedToken}`,
  //           userId: userId,
  //         },
  //       };

  //       const res = await get("/user/getCartDetailByUserId", config);
  //       console.log(res);
  //       setCartData(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  // const cartData = [
  //   {
  //     courseId: 1,
  //     image: img,
  //     title: "Finance course for Kids",
  //     category: "Finance",
  //     author: "Steeve Simbert",
  //     price: 500,
  //   },
  //   {
  //     courseId: 2,
  //     image: img,
  //     title: "React course for Developers",
  //     category: "Coding",
  //     author: "Manoj Kumar",
  //     price: 800,
  //   },
  //   {
  //     courseId: 3,
  //     image: img,
  //     title: "React course for Developers",
  //     category: "Coding",
  //     author: "Manoj Kumar",
  //     price: 800,
  //   },
  // ];

  useEffect(() => {
    setTotalCartItem(cartData.length);
    const calculatedTotal = cartData.reduce((acc, cart) => acc + cart.price, 0);
    setTotal(calculatedTotal);
  }, [cartData]);

  return (
    <cartContext.Provider
      value={{ cartData, total, setTotal, totalCartItem, setTotalCartItem }}
    >
      {children}
    </cartContext.Provider>
  );
};
