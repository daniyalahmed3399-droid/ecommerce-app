import { Link, useParams } from "react-router-dom";

import products from "../data/products";
import { useCart } from "../context/CartContext";


function ProductDetails() {

  // Get product ID from the URL.
  const { id } = useParams();

  // Find the matching product.
  const product = products.find(
    (item) => item.id === Number(id)
  );


  // Get addToCart from our Context.
  const { addToCart } = useCart();


  // Handle invalid product IDs.
  if (!product) {
    return (
      <main className="not-found">

        <h1>Product Not Found</h1>

        <p>
          Sorry, we couldn't find the product
          you're looking for.
        </p>

        <Link
          to="/products"
          className="back-button"
        >
          Back to Products
        </Link>

      </main>
    );
  }


  // This function runs when the user clicks
  // "Add to Cart".
  const handleAddToCart = () => {

    addToCart(product);

    alert(`${product.name} added to cart!`);
  };


  return (
    <main className="product-details-page">

      <div className="product-details">

        {/* Product image */}
        <div className="product-details-image-container">

          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />

        </div>


        {/* Product information */}
        <div className="product-details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-details-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="product-description">
            {product.description}
          </p>


          {/* Add product to cart */}
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>


          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}


export default ProductDetails;