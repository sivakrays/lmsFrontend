import { createContext, useState } from "react";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);

  return (
    <cartContext.Provider
      value={{ total, setTotal, totalCartItem, setTotalCartItem }}
    >
      {children}
    </cartContext.Provider>
  );
};
