import React, { useState } from "react";
import styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../components/auth/Auth";

const Signup = () => {
  const backendURL = "http://localhost:3090/api/auth/signup";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(false);
    setIsCreated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsCreated(false);
    const resp = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await resp.json();
    if (!data.success) {
      setError(true);
    }
    if (data.message === "New user has been created successfully.") {
      setError(false);
      setIsCreated(true);
      navigate("/signin");
    }
    setLoading(false);
  };
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form action="">
        <input
          id="username"
          onChange={handleChange}
          type="text"
          placeholder="Username"
        />
        <input
          id="email"
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
        <input
          id="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={loading} onClick={handleSubmit}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Auth inorup={"up"} />
        <p className={styles.bottomTxt}>
          Have an account? <Link to="/signin">Sign in</Link>
        </p>
        {error ? (
          <p className={styles.errText}>
            somthing went wrong. please try again later!
          </p>
        ) : (
          ""
        )}
        {isCreated && (
          <p className={styles.createdTxt}>User has been created!</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
