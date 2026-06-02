import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
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

  const addToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Product added to cart");
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">
        Products
      </h2>

      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-4"
            key={product._id}
          >
            <div className="card p-3 mb-4 shadow-sm">

              {/* PRODUCT IMAGE */}
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h4 className="card-title">
                  {product.name}
                </h4>

                <p className="card-text">
                  {product.description}
                </p>

                <h5 className="text-success">
                  ₹{product.price}
                </h5>

                <p>
                  Stock: {product.stock}
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;