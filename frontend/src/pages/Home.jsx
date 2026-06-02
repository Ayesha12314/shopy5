import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container mt-5 pt-5">

      {/* HERO SECTION */}
      <div
        className="bg-dark text-white text-center p-5"
      >
        <h1 className="display-4">
          Welcome to Shopy5
        </h1>

        <p className="lead">
          Discover Amazing Products at Best Prices
        </p>

        <button className="btn btn-warning btn-lg">
          Shop Now
        </button>
      </div>
      <div
  id="carouselExample"
  className="carousel slide mb-5"
>

  <div className="carousel-inner">

    <div className="carousel-item active">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        className="d-block w-100"
        alt="Banner"
        style={{
          height: "500px",
          objectFit: "cover"
        }}
      />
    </div>

    <div className="carousel-item">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
        className="d-block w-100"
        alt="Banner"
        style={{
          height: "500px",
          objectFit: "cover"
        }}
      />
    </div>

    <div className="carousel-item">
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        className="d-block w-100"
        alt="Banner"
        style={{
          height: "500px",
          objectFit: "cover"
        }}
      />
    </div>

  </div>

  {/* PREVIOUS BUTTON */}
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon"></span>
  </button>

  {/* NEXT BUTTON */}
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExample"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon"></span>
  </button>

</div>

      {/* FEATURED PRODUCTS */}
      <div className="container mt-5">

        <h2 className="mb-4 text-center">
          Featured Products
        </h2>

        <div className="row">

          {products.map((product) => (

            <div
              className="col-md-3"
              key={product._id}
            >

              <div className="card shadow-sm mb-4">

                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>{product.name}</h5>

                  <p>{product.description}</p>

                  <h6 className="text-success">
                    ₹{product.price}
                  </h6>

                  <button className="btn btn-primary w-100">
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;