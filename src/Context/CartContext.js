import { createContext, useEffect, useState } from "react";
import img from "../Assets/Home/course1.jpg";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);

  const cartData = [
    {
      courseId: 1,
      image: img,
      title: "Finance course for Kids",
      author: "Steeve Simbert",
      price: 500,
    },
  ];

  useEffect(() => {
    setTotalCartItem(cartData.length);
    const calculatedTotal = cartData.reduce((acc, cart) => acc + cart.price, 0);
    setTotal(calculatedTotal);
    console.log(calculatedTotal);
  }, [cartData]);

  return (
    <cartContext.Provider
      value={{ cartData, total, setTotal, totalCartItem, setTotalCartItem }}
    >
      {children}
    </cartContext.Provider>
  );
};
