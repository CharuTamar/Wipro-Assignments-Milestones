import { createContext, useState } from "react";

// 1️⃣ Create Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 2️⃣ Manage cart items in state
  const [cartItems, setCartItems] = useState([]);

  // 3️⃣ Function to add item to cart
  const addToCart = (product) => {
    setCartItems((prevCart) => [...prevCart, product]);
  };

  // 4️⃣ Function to remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
