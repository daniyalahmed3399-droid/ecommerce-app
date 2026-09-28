import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const orderId = location.state?.orderId;
  const total = location.state?.total;

  return (
    <main className="success-page">
      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="small-heading">
          ORDER CONFIRMED
        </p>

        <h1>Payment Successful!</h1>

        <p className="success-message">
          Thank you for your purchase.
          Your order has been successfully placed.
        </p>

        {orderId && (
          <div className="order-info">
            <div>
              <span>Order ID</span>
              <strong>#{orderId}</strong>
            </div>

            <div>
              <span>Total Paid</span>
              <strong>
                ${total?.toFixed(2)}
              </strong>
            </div>
          </div>
        )}

        <div className="success-actions">
          <Link
            to="/products"
            className="hero-button"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="continue-shopping"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}

export default Success;