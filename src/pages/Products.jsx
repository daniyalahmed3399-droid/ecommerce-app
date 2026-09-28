import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <main className="products-page">

      <div className="page-heading">
        <p className="small-heading">OUR COLLECTION</p>

        <h1>Explore Our Products</h1>

        <p>
          Find products designed to make your everyday life better.
        </p>
      </div>

      <div className="products-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </main>
  );
}

export default Products;