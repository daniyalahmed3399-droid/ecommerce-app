import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Dummy payment fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    // Make sure all fields are filled
    if (
      !name ||
      !email ||
      !address ||
      !city ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Basic card number validation
    if (cardNumber.length < 12) {
      setError("Please enter a valid card number.");
      return;
    }

    // Basic CVV validation
    if (cvv.length < 3) {
      setError("Please enter a valid CVV.");
      return;
    }

    /*
      We are not actually charging a card.

      This is a dummy payment process for
      our practice e-commerce application.
    */

    setProcessing(true);

    // Save the order before clearing the cart
    const newOrder = {
      id: Date.now(),
      userId: user.id,
      customerName: name,
      email,
      address,
      city,
      items: cart,
      total: cartTotal,
      paymentMethod: "Dummy Card",
      status: "Paid",
      date: new Date().toISOString(),
    };

    // Get previously saved orders
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Add the new order
    localStorage.setItem(
      "orders",
      JSON.stringify([
        ...savedOrders,
        newOrder,
      ])
    );

    /*
      Give the user a small fake payment delay.

      This makes the checkout feel more like
      a real payment process.
    */
    setTimeout(() => {
      // Empty the cart after successful payment
      clearCart();

      // Go to the success page
      navigate("/success", {
        state: {
          orderId: newOrder.id,
          total: newOrder.total,
        },
      });
    }, 1200);
  };

  // If somehow the cart is empty
  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <h1>Your Cart Is Empty</h1>

        <p>
          You need to add products before checking out.
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
    <main className="checkout-page">
      <div className="checkout-container">

        {/* Page heading */}
        <div className="checkout-header">
          <p className="small-heading">
            SECURE CHECKOUT
          </p>

          <h1>Complete Your Order</h1>

          <p>
            Enter your delivery and payment
            information below.
          </p>
        </div>

        <div className="checkout-content">

          {/* Checkout form */}
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <div className="checkout-section">
              <h2>Customer Information</h2>

              <div className="form-group">
                <label htmlFor="checkout-name">
                  Full Name
                </label>

                <input
                  id="checkout-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-email">
                  Email
                </label>

                <input
                  id="checkout-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </div>
            </div>

            {/* Delivery information */}
            <div className="checkout-section">
              <h2>Delivery Information</h2>

              <div className="form-group">
                <label htmlFor="checkout-address">
                  Address
                </label>

                <input
                  id="checkout-address"
                  type="text"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-city">
                  City
                </label>

                <input
                  id="checkout-city"
                  type="text"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                />
              </div>
            </div>

            {/* Payment information */}
            <div className="checkout-section">
              <h2>Payment Information</h2>

              <p className="dummy-payment-note">
                This is a dummy payment. No real
                money will be charged.
              </p>

              <div className="form-group">
                <label htmlFor="card-number">
                  Card Number
                </label>

                <input
                  id="card-number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(event.target.value)
                  }
                />
              </div>

              <div className="payment-row">

                <div className="form-group">
                  <label htmlFor="expiry">
                    Expiry Date
                  </label>

                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(event) =>
                      setExpiry(event.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">
                    CVV
                  </label>

                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(event) =>
                      setCvv(event.target.value)
                    }
                  />
                </div>

              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="place-order-button"
              disabled={processing}
            >
              {processing
                ? "Processing Payment..."
                : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <strong>
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>
                </div>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                ${cartTotal.toFixed(2)}
              </strong>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;