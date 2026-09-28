import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";

import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    {/* 
      AuthProvider gives the entire application
      access to login/signup/user information.
    */}
    <AuthProvider>

      {/* 
        CartProvider gives the entire application
        access to cart information.
      */}
      <CartProvider>

        <App />

      </CartProvider>

    </AuthProvider>

  </StrictMode>
);