import React from "react";
import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import FocusLock from "react-focus-lock";
import { StyledBurger } from "../components/Burger/Burger.styled";
import { StyledMenu } from "../components/Menu/Menu.styled";
import { useOnClickOutside } from "../hooks";
import { useSignUp } from "../auth/useSignUp.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  // const [fileUploaded, setFileUploaded] = useState(false);
  // const [uploadState, setUploadState] = useState("Uploading image");
  const [profileImageURL, setProfileImageURL] = useState(null);
  // const [progress, setProgress] = useState(0);
  // const [imageError, setImageError] = useState(null);
  const { error, signup } = useSignUp();

  const [open, setOpen] = useState(false);
  const node = useRef();

  const isExpanded = open ? true : false;
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Pass in the isEnabled state
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  const updateTheme = (isDarkEnabled) => {
    // Get all available styles
    const styles = getComputedStyle(document.body);

    // Get the --black and --white variable values
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");

    // Optional shorthand constant for accessing document.documentElement
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      docEl.style.setProperty("--background", white);
      docEl.style.setProperty("--foreground", black);
      // document.querySelector("html").classList.add("darkmode");
    } else {
      docEl.style.setProperty("--background", black);
      docEl.style.setProperty("--foreground", white);
      // document.querySelector("html").classList.remove("darkmode");
    }
  };

  // closes burger menu when user clicks outside
  useOnClickOutside(node, () => setOpen(false));

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // const handleFileChange = (e) => {
  //   setProfileImage(null);
  //   setUploadState("Uploading image");
  //   let uploadedImage = e.target.files[0];
  //   console.log(uploadedImage);

  //   if (!uploadedImage) {
  //     setFileUploaded(false);
  //     setImageError("An image has not been uploaded.");
  //     return;
  //   }

  //   if (!uploadedImage.type.includes("image")) {
  //     setFileUploaded(false);
  //     setImageError("This file is not an image type.");
  //     return;
  //   }

  //   if (!uploadedImage.size > 100000) {
  //     setFileUploaded(false);
  //     setImageError("Image file size needs to be less than 100kb.");
  //     return;
  //   }

  //   setImageError(null);
  //   setProfileImage(uploadedImage);
  //   console.log("profileImage: ", profileImage);

  //   // Create the file metadata
  //   const metadata = {
  //     contentType: "image/*",
  //   };

  //   // Create a storage reference from our storage service
  //   const storageRef = ref(storage, "images/" + uploadedImage.name);

  //   const uploadTask = uploadBytesResumable(
  //     storageRef,
  //     uploadedImage,
  //     metadata
  //   );
  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress = Math.floor(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //       console.log("Upload is " + progress + "% done");
  //       setFileUploaded(true);
  //       if (progress === 100) {
  //         setUploadState("Finished uploading");
  //       }
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case "storage/unauthorized":
  //           // User doesn't have permission to access the object
  //           setFileUploaded(false);
  //           setImageError(error);
  //           break;
  //         case "storage/canceled":
  //           // User canceled the upload
  //           setFileUploaded(false);
  //           setImageError(error);
  //           break;
  //         case "storage/unknown":
  //           // Unknown error occurred, inspect error.serverResponse
  //           setFileUploaded(false);
  //           setImageError(error);
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         setProfileImageURL(downloadURL);
  //       });
  //     }
  //   );
  //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     console.log("File available at", downloadURL);
  //     setProfileImageURL(downloadURL);
  //   });

  //   console.log("User profile image has been updated.");
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setFileUploaded(false);
    signup(userName, emailAddress, password);
  };

  return (
    <div className="register">
      <header className="header">
        {/* <ThemeProvider theme={theme}>
          <div ref={node} className="burger-home-menu show">
            <FocusLock disabled={!open}>
              <StyledBurger
                aria-label="Toggle menu"
                aria-expanded={isExpanded}
                open={open}
                onClick={() => setOpen(!open)}
              >
                <span />
                <span />
                <span />
              </StyledBurger>
              <StyledMenu open={open} aria-hidden={!isHidden}>
                <Link to="/" tabIndex={tabIndex} className="nav-item">
                  Home
                </Link>
                <Link to="/login" tabIndex={tabIndex} className="nav-item">
                  Login
                </Link>
              </StyledMenu>
            </FocusLock>
          </div>
        </ThemeProvider> */}
        <Link to="/" className="title-logo">
          Pak's Raps
        </Link>
        <nav className="header-nav">
          <label className="toggle-wrapper" htmlFor="toggle">
            <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
              <span className="hidden">
                {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
              </span>
              <div className="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-sun-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-moon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
              </div>
              <input
                id="toggle"
                name="toggle"
                type="checkbox"
                checked={isEnabled}
                onClick={toggleState}
              />
            </div>
          </label>
        </nav>
      </header>
      <section className="registration-section">
        <h1 className="heading">Create Account</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div class="row">
            <div class="col-25">
              <label className="register-label" for="user-name">
                Username (minimum length of 6 characters)
              </label>
            </div>
            <div class="col-75">
              <input
                type="text"
                id="user-name"
                name="username"
                pattern=".{6,}"
                title="Six or more characters"
                onChange={(event) => setUserName(event.target.value)}
                className="username-input"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label className="register-label" for="email">
                Email Address
              </label>
            </div>
            <div class="col-75">
              <input
                type="email"
                id="email"
                name="emailaddress"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                onChange={(event) => setEmailAddress(event.target.value)}
                className="email-input"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label className="register-label" for="password">
                Password
              </label>
            </div>
            <div class="col-75">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                className="password-input"
                required
              />
            </div>
          </div>
          {/* <div class="row">
            <div class="col-25">
              <label className="register-label" for="profile-picture">
                Profile Image
              </label>
            </div>
            <div class="col-75">
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                className="profile-picture-input"
                onChange={handleFileChange}
                required
              />
            </div>
            {fileUploaded && (
              <label className="progress-bar">
                {uploadState}:&nbsp;
                <progress value={progress} max="100"></progress>
                &nbsp;{progress}%
              </label>
            )}
            {progress === 100 && (
              <img
                src={profileImageURL}
                className="preview-image"
                alt="user avatar"
              />
            )}
            {imageError && <div className="file-error">{imageError}</div>}
          </div> */}
          <div className="row">
            <p className="sign-in">
              Already registered an account?&nbsp;
              <Link to="/login" className="login-link">
                Sign in here
              </Link>
            </p>
          </div>
          <input type="submit" value="Submit" className="submit-btn" />
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default Register;
