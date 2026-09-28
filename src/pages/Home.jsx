import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      <section className="hero">

        <div className="hero-content">

          <p className="small-heading">
            WELCOME TO SHOPEASE
          </p>

          <h1>
            Everything You Need,
            <span> All In One Place.</span>
          </h1>

          <p>
            Discover quality products, simple shopping,
            and a smooth checkout experience.
          </p>

          <Link to="/products" className="hero-button">
            Explore Products
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;