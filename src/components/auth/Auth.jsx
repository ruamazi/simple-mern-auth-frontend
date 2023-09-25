import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../features/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ inorup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    const auth = getAuth(app);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const resp = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await resp.json();
      dispatch(signInSuccess(data));
      if (data.username) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("Could not login with google", error);
    }
  };

  return (
    <button onClick={handleClick} type="button">
      Sign {inorup} With Google
    </button>
  );
};

export default Auth;
