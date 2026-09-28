import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();


  // If there are no products in the cart.
  if (cart.length === 0) {

    return (
      <main className="empty-cart">

        <h1>Your Cart Is Empty</h1>

        <p>
          You haven't added anything to your cart yet.
        </p>

        <Link
          to="/products"
          className="back-button"
        >
          Start Shopping
        </Link>

      </main>
    );
  }


  return (
    <main className="cart-page">

      <div className="cart-container">

        <div className="cart-header">

          <div>
            <p className="small-heading">
              SHOPPING CART
            </p>

            <h1>Your Cart</h1>
          </div>

        </div>


        <div className="cart-content">

          {/* Products */}
          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* Product image */}
                <img
                  src={item.image}
                  alt={item.name}
                />


                {/* Product information */}
                <div className="cart-item-info">

                  <p className="product-category">
                    {item.category}
                  </p>

                  <h3>{item.name}</h3>

                  <p className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </p>

                </div>


                {/* Quantity controls */}
                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                {/* Remove button */}
                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>


          {/* Order summary */}
          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>Subtotal</span>

              <strong>
                ${cartTotal.toFixed(2)}
              </strong>

            </div>


            <div className="summary-row">

              <span>Shipping</span>

              <strong>Free</strong>

            </div>


            <div className="summary-total">

              <span>Total</span>

              <strong>
                ${cartTotal.toFixed(2)}
              </strong>

            </div>


            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}


export default Cart;