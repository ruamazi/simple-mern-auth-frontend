import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>AUTH</div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {!currentUser ? (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <img
                className={styles.profilePic}
                src={currentUser.profilePicture}
                alt="profile image"
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
