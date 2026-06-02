import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged Out");
    window.location.href = "/login";
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">
          Shopy5
        </Link>

        <div className="ms-auto d-flex gap-3 align-items-center">

          <Link className="nav-link text-white" to="/">
            Home
          </Link>

          <Link className="nav-link text-white" to="/products">
            Products
          </Link>

          <Link className="nav-link text-white" to="/cart">
            Cart
          </Link>

          <Link className="nav-link text-white" to="/checkout">
            Checkout
          </Link>

          <Link className="nav-link text-white" to="/admin">
            Admin
          </Link>

          {/* SHOW ONLY WHEN NOT LOGGED IN */}
          {!token && (
            <>
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>

              <Link className="nav-link text-white" to="/register">
                Register
              </Link>
            </>
          )}

          {/* SHOW ONLY WHEN LOGGED IN */}
          {token && (
            <button
              onClick={logout}
              className="btn btn-danger"
            >
              Logout
            </button>
          )}

        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;