import { useState } from "react";
import styles from "./signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../../components/auth/Auth";

const Singin = () => {
  const [inputData, setInputData] = useState({
    email: null,
    password: null,
  });
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/signin",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputData),
        }
      );
      const data = await resp.json();
      if (data.statusCode === 404 || data.statusCode === 401) {
        dispatch(signInFailure(data));
      }
      if (data.username) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
    dispatch(signInFailure(null));
  };
  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form>
        <input
          required
          id="email"
          onChange={handleChange}
          type="text"
          placeholder="Email"
        />
        <input
          required
          id="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <button
          disabled={inputData.email === "" || inputData.password === ""}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <Auth inorup={"in"} />
        <p className={styles.bottomTxt}>
          You dont have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className={styles.errText}>
          {error ? error.message || "Somthing went wrong!" : ""}
        </p>
      </form>
    </div>
  );
};

export default Singin;
