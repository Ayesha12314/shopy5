import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/login",
        formData
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      // REDIRECT
      navigate("/products");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5 pt-5">

      <div className="card p-4 shadow col-md-6 mx-auto">

        <h2 className="mb-4 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-control mb-3"
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;