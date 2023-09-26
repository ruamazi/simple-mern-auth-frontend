import { useEffect, useRef, useState } from "react";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../features/firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOut,
} from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const P = "password";
const E = "email";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
      setUpdateSuccess(false);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "_" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(progress);
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateSuccess(false);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/update/${
          currentUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await resp.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const resp = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${
          currentUser._id
        }`,
        {
          method: "DELETE",
        }
      );
      const data = await resp.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
      }
      dispatch(deleteUserSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleOut = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`, {
        method: "GET",
      });
      dispatch(signOut());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      <img
        src={formData?.profilePicture || currentUser.profilePicture}
        alt="profile"
        onClick={() => fileRef.current.click()}
      />
      <p>
        {imageError ? (
          <span style={{ color: "red" }}>Error while uploading the image!</span>
        ) : imagePercent > 0 && imagePercent < 100 ? (
          <span style={{ color: "white" }}>
            Uploading... {imagePercent + "%"}{" "}
          </span>
        ) : imagePercent === 100 ? (
          <span>Image uploaded successfully</span>
        ) : (
          ""
        )}
      </p>
      <form>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <h2>
          Username: <span> {currentUser.username}</span>
        </h2>
        <h2>
          Email: <span> {currentUser.email}</span>
        </h2>
        <p>Update your profile:</p>
        <input
          id="username"
          type="text"
          placeholder="Username"
          required
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          id={E}
          type={E}
          placeholder={E}
          required
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          id={P}
          type={P}
          placeholder={P}
          required
          onChange={handleChange}
        />
        <button className={styles.btn} onClick={handleSave}>
          {loading ? "Updating..." : "Save changes"}
        </button>
        <div className={styles.bottom}>
          <button type="button" onClick={handleDeleteUser}>
            Delete Account
          </button>
          <button type="button" onClick={handleOut}>
            Sign out
          </button>
        </div>
        {error ? (
          <p className={styles.errText}>Somthing went wrong! try again!</p>
        ) : updateSuccess ? (
          <p className={styles.sucText}>User updated successfully</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Profile;
