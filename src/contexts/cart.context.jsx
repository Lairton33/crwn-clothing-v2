import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const removeItemFromCart = (productToRemove) =>
    setCartItems(removeCartItem(cartItems, productToRemove));

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, { quantity }) => total + quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, { quantity, price }) => total + quantity * price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    cartTotal,
    cartCount,
    cartItems,
    isCartOpen,
    addItemToCart,
    setIsCartOpen,
    clearItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
