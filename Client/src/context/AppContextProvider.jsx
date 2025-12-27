import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";
import { isTokenValid } from "../utils/authUtils";

function AppContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
   const existingItem =  cartItems.find(cartItem => cartItem.name === item.name)
   if(existingItem) {
    setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem))
   } else {
    setCartItems([...cartItems, {...item, quantity: 1}]);
   }
  }

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(cartItem => cartItem.itemId !== itemId));
  }

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(cartItem => cartItem.itemId === itemId ? {...cartItem, quantity: newQuantity} : cartItem))
  }

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && isTokenValid(token) && role) {
        setAuthData(token, role);
        try {
          const response = await fetchCategories();
          const itemResponse = await fetchItems();
          setCategories(response.data);
          setItems(itemResponse.data);
        } catch (error) {
          console.error("Error loading initial data:", error);
        }
      }
    }
    loadData();
  }, []);


  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const clearCart = () => {
    setCartItems([]);
  }

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addToCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart    
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
