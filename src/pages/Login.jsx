import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message
  const [error, setError] = useState("");


  const handleSubmit = (event) => {

    event.preventDefault();

    setError("");


    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }


    // Attempt login.
    const result = login(
      email,
      password
    );


    // Login failed.
    if (!result.success) {
      setError(result.message);
      return;
    }


    // Login successful.
    navigate("/");
  };


  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <p className="small-heading">
            WELCOME BACK
          </p>

          <h1>Login</h1>

          <p>
            Login to continue shopping.
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">

            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>


          {/* Error */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?

          {" "}

          <Link to="/signup">
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}


export default Login;