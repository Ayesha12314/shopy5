import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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

    alert("Product Added To Cart");
  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">
        Products
      </h2>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search Products..."
        className="form-control mb-4"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="row">

        {filteredProducts.map((product) => (
          <div
            className="col-md-4"
            key={product._id}
          >
            <div className="card p-3 mb-4 shadow-sm">

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/200"
                }
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">

                <h4>{product.name}</h4>

                <p>{product.description}</p>

                <h5 className="text-success">
                  ₹{product.price}
                </h5>

                <p>
                  Stock: {product.stock}
                </p>

                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: "#3E8E9E",
                    color: "white",
                  }}
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add To Cart
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