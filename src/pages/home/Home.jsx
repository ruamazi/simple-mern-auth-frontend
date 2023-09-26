import React from "react";
import styles from "./home.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.hero}>
          <h1>
            Welcome {currentUser ? <span>{currentUser.username}</span> : ""} to
            MERN Auth app!
          </h1>
          <p>
            This web page is a demo project focuses on user authentication and
            profile management.
          </p>
        </div>
        <h2>User Authentication:</h2>
        <ul>
          <li>
            New User Creation: Users can create a new account by providing their
            desired username, email, and password.
          </li>
          <li>
            Log In: Existing users can log in using their registered email and
            password.
          </li>
        </ul>

        <h2>Profile Page:</h2>
        <ul>
          <li>
            User Information Display: Once logged in, users are directed to
            their profile page, where they can view their current profile image,
            username, and email.
          </li>
          <li>
            Update Profile Image: Users have the option to update their profile
            image by uploading a new image. The updated image is stored using
            Firebase.
          </li>
          <li>
            Update Username and Email: Users can edit and save changes to their
            username and email, which will be reflected on their profile page.
          </li>
          <li>
            Change Password: Users can modify their account password by entering
            the current password and setting a new one.
          </li>
        </ul>

        <h2>Account Management:</h2>
        <ul>
          <li>
            Delete Account: Users can choose to permanently delete their
            account, which will remove all associated data from the MongoDB
            database.
          </li>
          <li>
            Sign Out: Users can log out of their account, ending their current
            session.
          </li>
        </ul>

        <h2>Technologies Used:</h2>
        <ul>
          <li>Front-end: React.js (JavaScript library)</li>
          <li>
            Back-end: Node.js (JavaScript runtime) and MongoDB (NoSQL database)
          </li>
          <li>Image Storage: Firebase (cloud storage)</li>
          <li>Styling: CSS Modules</li>
        </ul>

        <p className={styles.btmp}>
          Our application provides a seamless and secure user experience,
          allowing users to manage their profile information effectively. Feel
          free to explore the various features and make the most of our app's
          functionalities.
        </p>
        {!currentUser ? (
          <div className={styles.links}>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
