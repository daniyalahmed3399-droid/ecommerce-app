import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      {/* Product image */}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">

        {/* Category */}
        <p className="product-category">
          {product.category}
        </p>

        {/* Product name */}
        <h3>{product.name}</h3>

        {/* Price */}
        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>

        {/* Go to product details */}
        <Link
          to={`/products/${product.id}`}
          className="view-product"
        >
          View Product
        </Link>

      </div>
    </div>
  );
}

export default ProductCard;