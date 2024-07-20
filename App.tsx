import React from "react";
import { CartProvider } from "./contexts/CartContext";
import StackNavigator from "./navigation/StackNavigator";

const App = () => {
  return (
    <CartProvider>
      <StackNavigator />
    </CartProvider>
  );
};

export default App;
