import React from "react";
import styles from "./about.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>About Our App</h1>
        <p>Welcome to our MERN Auth app!</p>

        <h2>Objective</h2>
        <p>
          Our app aims to provide a seamless and secure user authentication and
          profile management system. We prioritize user privacy and convenience,
          allowing users to easily create an account, manage their profile
          information, and perform essential account actions.
        </p>

        <h2>Features</h2>
        <ul>
          <li>
            User Authentication: Users can create a new account, log in with
            their credentials, and securely access their profile.
          </li>
          <li>
            Profile Management: Users can view their profile information, update
            their profile image, edit their username and email, and change their
            password.
          </li>
          <li>
            Account Actions: Users have the option to delete their account
            permanently and sign out of their current session.
          </li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
          <li>Front-end: React.js</li>
          <li>Back-end: Node.js and MongoDB</li>
          <li>Image Storage: Firebase</li>
          <li>Styling: CSS Modules</li>
        </ul>

        <h2>How to Get Started</h2>
        <p>To start using our app, follow these steps:</p>
        <ol>
          <li>
            Create a new account by providing your desired username, email, and
            password.
          </li>
          <li>Log in using your registered email and password.</li>
          <li>
            Explore your profile page, where you can view and manage your
            profile information.
          </li>
          <li>
            Feel free to update your profile image, edit your username and
            email, or change your password as needed.
          </li>
          <li>
            If you ever wish to delete your account, you can choose the "Delete
            Account" option.
          </li>
          <li>
            When you're done, you can sign out to end your current session.
          </li>
        </ol>

        <p>
          Thank you for choosing our app! We hope you have a great user
          experience and find our features helpful for managing your profile
          effectively.
        </p>
        <div className={styles.links}>
          <Link
            target="_blanc"
            to="https://github.com/ruamazi/simple-mern-auth-frontend"
          >
            Frontend code on github
          </Link>
          <Link
            target="_blanc"
            to="https://github.com/ruamazi/simple-mern-auth-backend"
          >
            Backend code on github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
