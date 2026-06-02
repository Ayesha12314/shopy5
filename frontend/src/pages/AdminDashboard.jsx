import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // EDIT PRODUCT
  const editProduct = (product) => {

    setEditingProduct(product);

    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: product.image,
    });
  };

  // ADD OR UPDATE PRODUCT
  const addProduct = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      // UPDATE PRODUCT
      if (editingProduct) {

        await api.put(
          `/products/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product Updated");

        setEditingProduct(null);

      } else {

        // ADD PRODUCT
        await api.post(
          "/products",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Product Added");
      }

      // CLEAR FORM
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: "",
      });

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Operation Failed");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Failed To Delete Product");
    }
  };

  return (
    <div className="container mt-5 pt-5">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      {/* FORM */}
      <form onSubmit={addProduct}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <button
          type="submit"
          className="btn btn-primary"
        >
          {editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>

      </form>

      <hr />

      <h3 className="mb-4">
        All Products
      </h3>

      <div className="row">

        {products.map((product) => (

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
                  height: "200px",
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

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-warning w-50"
                    onClick={() =>
                      editProduct(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger w-50"
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;