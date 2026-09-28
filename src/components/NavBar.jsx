import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


function NavBar() {

  // Cart information
  const { cartCount } = useCart();

  // Authentication information
  const { user, logout } = useAuth();


  return (
    <nav className="navbar">

      {/* Logo */}
      <Link
        to="/"
        className="logo"
      >
        Shop<span>Ease</span>
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>


        <Link
          to="/cart"
          className="cart-link"
        >
          🛒 Cart

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>


        {/* 
          Show different buttons depending
          on whether someone is logged in.
        */}
        {user ? (

          <>
            <span className="welcome-user">
              Hi, {user.name}
            </span>

            <button
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-link"
            >
              Sign Up
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}


export default NavBar;