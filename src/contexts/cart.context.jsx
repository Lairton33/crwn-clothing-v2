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

const getQuantityIncreasedProducts = (cartItems, id) => {
  return cartItems.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
};
const getQuantityDecreasedProducts = (cartItems, id) => {
  const itemToDecrease = cartItems.find((item) => item.id === id);
  if (itemToDecrease.quantity === 1) return cartItems;

  return cartItems.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  );
};
const getCartAfterItemRemoval = (cartItems, id) => {
  return cartItems.filter((item) => item.id !== id);
};

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  totalCartPrice: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  quantityIncrease: () => {},
  quantityDecrease: () => {},
  removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const quantityIncrease = (id) =>
    setCartItems(getQuantityIncreasedProducts(cartItems, id));

  const quantityDecrease = (id) =>
    setCartItems(getQuantityDecreasedProducts(cartItems, id));

  const removeItemFromCart = (id) =>
    setCartItems(getCartAfterItemRemoval(cartItems, id));

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, { quantity }) => total + quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotalPrice = cartItems.reduce(
      (totalPrice, { quantity, price }) => totalPrice + quantity * price,
      0
    );
    setTotalCartPrice(newCartTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    cartCount,
    cartItems,
    isCartOpen,
    totalCartPrice,
    addItemToCart,
    setIsCartOpen,
    quantityDecrease,
    quantityIncrease,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
