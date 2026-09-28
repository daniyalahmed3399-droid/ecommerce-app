import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useAuth();

  /*
    Keep track of which user's cart is currently loaded.

    This helps us avoid accidentally saving one user's
    cart into another user's account.
  */
  const loadedUserId = useRef(null);

  /*
    Load the cart for the currently logged-in user.

    Each user gets their own cart inside the "carts"
    object in localStorage.
  */
  const [cart, setCart] = useState(() => {
    const currentUser =
      JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      return [];
    }

    const savedCarts =
      JSON.parse(localStorage.getItem("carts")) || {};

    return savedCarts[currentUser.id] || [];
  });

  /*
    Whenever the logged-in user changes:

    Login:
      Load that user's saved cart.

    Logout:
      Empty the cart from React state,
      but DO NOT delete the saved cart.
  */
  useEffect(() => {
    if (!user) {
      setCart([]);
      loadedUserId.current = null;
      return;
    }

    const savedCarts =
      JSON.parse(localStorage.getItem("carts")) || {};

    const userCart = savedCarts[user.id] || [];

    setCart(userCart);

    loadedUserId.current = user.id;
  }, [user]);

  /*
    Save the current user's cart whenever
    the cart changes.

    Notice that we save it under the user's ID.
  */
  useEffect(() => {
    if (!user) {
      return;
    }

    /*
      Don't save until this user's cart has actually
      been loaded.

      This prevents an old user's cart from
      overwriting the new user's saved cart.
    */
    if (loadedUserId.current !== user.id) {
      return;
    }

    const savedCarts =
      JSON.parse(localStorage.getItem("carts")) || {};

    savedCarts[user.id] = cart;

    localStorage.setItem(
      "carts",
      JSON.stringify(savedCarts)
    );
  }, [cart, user]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      // Product already exists
      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // New product
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove a product completely
  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*
    clearCart() is mainly used after a successful order.

    It clears the current user's cart and the
    saved cart belonging to that user.
  */
  const clearCart = () => {
    setCart([]);

    if (!user) {
      return;
    }

    const savedCarts =
      JSON.parse(localStorage.getItem("carts")) || {};

    savedCarts[user.id] = [];

    localStorage.setItem(
      "carts",
      JSON.stringify(savedCarts)
    );
  };

  // Calculate total number of products
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;