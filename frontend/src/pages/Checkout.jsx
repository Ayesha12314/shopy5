import { useState } from "react";
import api from "../services/api";

function Checkout() {
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      const products = cart.map((item) => ({
        product: item._id,
        quantity: 1,
      }));

      const totalAmount = cart.reduce(
        (total, item) => total + item.price,
        0
      );

      const res = await api.post(
        "/orders",
        {
          products,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Order Placed Successfully");

      localStorage.removeItem("cart");

      console.log(res.data);

    } catch (error) {
      console.log(error);

      alert("Checkout Failed");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2>Checkout Page</h2>

      <button onClick={handleCheckout}>
        Place Order
      </button>

      <p>{message}</p>
    </div>
  );
}

export default Checkout;