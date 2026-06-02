import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);
  }, []);

  // REMOVE ITEM FUNCTION
  const removeItem = (index) => {
    const updatedCart =
      cart.filter((_, i) => i !== index);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Cart Page</h2>

      {cart.map((item, index) => (
        <div
          key={index}
          className="card p-3 mb-3 shadow-sm"
        >
          <h3>{item.name}</h3>

          <p>Price: ₹{item.price}</p>

          <button
            className="btn btn-danger"
            onClick={() => removeItem(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="mt-4">
        Total: ₹{totalPrice}
      </h2>
    </div>
  );
}

export default Cart;