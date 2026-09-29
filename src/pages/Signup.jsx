import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Signup() {

  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error message
  const [error, setError] = useState("");


  const { signup } = useAuth();


  const handleSubmit = (event) => {

    event.preventDefault();

    setError("");


    // Basic validation.
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }


    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }


    // Try to create the account.
    const result = signup(
      name,
      email,
      password
    );


    // Signup failed.
    if (!result.success) {
      setError(result.message);
      return;
    }


    // Signup successful.
    navigate("/login");
  };


  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <p className="small-heading">
            JOIN SHOP<span style={{ color: 'black' }}>EASE</span>
          </p>

          <h1>Create Account</h1>

          <p>
            Create your account and start shopping.
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
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

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
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
            Create Account
          </button>

        </form>


        <p className="auth-footer">

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </main>
  );
}


export default Signup;