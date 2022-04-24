import React from "react";
import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogOut } from "../auth/useLogOut";
import { Link } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import FocusLock from "react-focus-lock";
import { StyledBurger } from "../components/Burger/Burger.styled";
import { StyledMenu } from "../components/Menu/Menu.styled";
import { useOnClickOutside } from "../hooks";

// firebase imports
import { auth } from "../firebase/config";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserName, setCurrentUserName] = useState(
    auth.currentUser.displayName
  );
  const [currentEmailAddress, setCurrentEmailAddress] = useState(
    auth.currentUser.email
  );
  const [currentPassword, setCurrentPassword] = useState(
    auth.currentUser.password
  );

  const [editUsernameError, setEditUsernameError] = useState(null);
  const [editProfilePictureError, setEditProfilePictureError] = useState(null);
  const [editEmailError, setEditEmailError] = useState(null);
  const [editPasswordError, setEditPasswordError] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadState, setUploadState] = useState("Uploading image");
  const [profileImageURL, setProfileImageURL] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(null);

  const [open, setOpen] = useState(false);
  const node = useRef();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownNode = useRef();

  const navigate = useNavigate();

  const isExpanded = open ? true : false;
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const isDropdownExpanded = dropdownOpen ? true : false;
  const isDropdownHidden = dropdownOpen ? true : false;
  const tabDropdownIndex = isDropdownHidden ? 0 : -1;

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

  // closes user dropdown menu when user clicks outside
  useOnClickOutside(dropdownNode, () => setDropdownOpen(false));

  const { logout } = useLogOut();

  // return to the song list
  const returnToList = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate("/songs", { replace: true });
    setOpen(!open);
    // document.querySelector(".burger-menu").classList.remove("show");
    // document.querySelector(".burger-logoff-menu").classList.add("show");
  };

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  const handleFileChange = (e) => {
    setProfileImage(null);
    setUploadState("Uploading image");
    let uploadedImage = e.target.files[0];
    console.log(uploadedImage);
    if (!uploadedImage) {
      setFileUploaded(false);
      setImageError("An image has not been uploaded.");
      return;
    }
    if (!uploadedImage.type.includes("image")) {
      setFileUploaded(false);
      setImageError("This file is not an image type.");
      return;
    }
    if (!uploadedImage.size > 100000) {
      setFileUploaded(false);
      setImageError("Image file size needs to be less than 100kb.");
      return;
    }
    setImageError(null);
    setProfileImage(uploadedImage);
    console.log("profileImage: ", profileImage);
    // Create the file metadata
    const metadata = {
      contentType: "image/*",
    };
    // Create a storage reference from our storage service
    const storageRef = ref(storage, "images/" + uploadedImage.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      uploadedImage,
      metadata
    );
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        setFileUploaded(true);
        if (progress === 100) {
          setUploadState("Finished uploading");
        }
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setFileUploaded(false);
            setImageError(error);
            break;
          case "storage/canceled":
            // User canceled the upload
            setFileUploaded(false);
            setImageError(error);
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            setFileUploaded(false);
            setImageError(error);
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProfileImageURL(downloadURL);
        });
        console.log("User profile image has been updated.");
      }
    );
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      setProfileImageURL(downloadURL);
    });
    console.log("User profile image has been updated.");
  };

  const editUsernameSubmit = (event) => {
    event.preventDefault();
    setEditUsernameError(null);
    if (userName === currentUserName) {
      setEditUsernameError("You already have this username.");
    } else {
      updateProfile(auth.currentUser, {
        displayName: userName,
      })
        .then(() => {
          alert("Username updated!");
        })
        .catch((error) => {
          setEditUsernameError(error.message);
          alert("Login expired, please relog and try again.");
          reauthenticateWithCredential(auth.currentUser, promptForCredentials())
            .then(() => {
              // User re-authenticated.
            })
            .catch((error) => {
              // An error ocurred
              // ...
            });
        });
    }
    document.querySelector(".username-input").value = "";
  };

  const editProfilePictureSubmit = (event) => {
    event.preventDefault();
    setEditProfilePictureError(null);
    updateProfile(auth.currentUser, {
      photoURL: profileImageURL,
    })
      .then(() => {
        alert(
          "Profile picture updated! Click on your profile icon on the top right to see the change."
        );
      })
      .catch((error) => {
        setEditProfilePictureError(error.message);
        alert("Login expired, please relog and try again.");
        reauthenticateWithCredential(auth.currentUser, promptForCredentials())
          .then(() => {
            // User re-authenticated.
          })
          .catch((error) => {
            // An error ocurred
            // ...
          });
      });
    setProgress(0);
    setFileUploaded(false);
  };

  const editEmailSubmit = (event) => {
    event.preventDefault();
    setEditEmailError(null);
    if (emailAddress === currentEmailAddress) {
      setEditEmailError("You are already using this email address.");
    } else {
      updateEmail(auth.currentUser, emailAddress)
        .then(() => {
          alert("Email updated!");
        })
        .catch((error) => {
          setEditEmailError(error.message);
          alert("Login expired, please relog and try again.");
          reauthenticateWithCredential(auth.currentUser, promptForCredentials())
            .then(() => {
              // User re-authenticated.
            })
            .catch((error) => {
              // An error ocurred
              // ...
            });
        });
    }
    document.querySelector(".email-input").value = "";
  };

  const editPasswordSubmit = (event) => {
    event.preventDefault();
    setEditPasswordError(null);
    if (password === currentEmailAddress) {
      setEditPasswordError("You are already using this password.");
    } else {
      updatePassword(auth.currentUser, password)
        .then(() => {
          alert("Password updated!");
        })
        .catch((error) => {
          setEditPasswordError(error.message);
          switch (error.code) {
            case "auth/weak-password":
              setEditPasswordError("Password should be at least 6 characters");
              break;
            default:
              alert("Login expired, please relog and try again.");
              reauthenticateWithCredential(
                auth.currentUser,
                promptForCredentials()
              )
                .then(() => {
                  // User re-authenticated.
                })
                .catch((error) => {
                  // An error ocurred
                  // ...
                });
              break;
          }
        });
    }
    document.querySelector(".password-input").value = "";
  };

  const promptForCredentials = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="edit-profile">
      <header className="header">
        <ThemeProvider theme={theme}>
          <div ref={node} className="burger-menu show">
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
                <Link to="/" className="home-link home-mobile-link">
                  <p href="/" tabIndex={tabIndex} className="nav-item">
                    Home
                  </p>
                </Link>
                <p
                  href="/"
                  tabIndex={tabIndex}
                  onClick={() => returnToList()}
                  className="nav-item"
                >
                  Song List
                </p>
              </StyledMenu>
            </FocusLock>
          </div>
        </ThemeProvider>
        <Link to="/" className="title-logo logo">
          Pak's Raps
        </Link>
        <nav className="header-nav">
          {/* <label className="toggle-wrapper" htmlFor="toggle">
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
          </label> */}
          <ul className="header-nav-list">
            <li className="user" ref={dropdownNode}>
              <div
                className="image-div"
                aria-expanded={isDropdownExpanded}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={auth.currentUser.photoURL}
                  className="profile-image"
                  alt="user avatar"
                />
              </div>
              {dropdownOpen && (
                <div
                  className="user-dropdown"
                  dropdownOpen={dropdownOpen}
                  aria-hidden={!isDropdownHidden}
                >
                  <ul className="dropdown-menu">
                    <li className="dropdown-menu-option account-heading">
                      Account
                    </li>
                    <hr />
                    <li
                      className="dropdown-menu-option"
                      tabIndex={tabDropdownIndex}
                      onClick={logout}
                    >
                      Log off
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
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
            </li>
          </ul>
        </nav>
      </header>
      <section className="edit-profile-section">
        <h1 className="heading">Edit Profile</h1>
        <form onSubmit={editUsernameSubmit} className="edit-profile-form">
          {/* <h2 className="heading">Edit Username</h2> */}
          <div class="row">
            <div class="col-25">
              <label className="edit-label" for="user-name">
                Change Username (minimum length of 6 characters)
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
          <input type="submit" value="Save" className="save-btn" />
          {editUsernameError && (
            <p className="error-message">{editUsernameError}</p>
          )}
        </form>
        <form onSubmit={editProfilePictureSubmit} className="edit-profile-form">
          {/* <h2 className="heading">Edit User Avatar</h2> */}
          <div class="row">
            <div class="col-25">
              <label className="edit-label" for="profile-picture">
                Change Profile Image
              </label>
            </div>
            <div class="col-75">
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                className="profile-picture-input"
                onChange={handleFileChange}
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
          </div>
          <input type="submit" value="Save" className="save-btn" />
          {editProfilePictureError && (
            <p className="error-message">{editProfilePictureError}</p>
          )}
        </form>
        <form onSubmit={editEmailSubmit} className="edit-profile-form">
          {/* <h2 className="heading">Edit Email</h2> */}
          <div class="row">
            <div class="col-25">
              <label className="edit-label" for="email">
                Change Email Address
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
            <p className="warning-message">
              Warning: You will need to relog to verify your new email address.
            </p>
          </div>
          <input type="submit" value="Save" className="save-btn" />
          {editEmailError && <p className="error-message">{editEmailError}</p>}
        </form>
        <form onSubmit={editPasswordSubmit} className="edit-profile-form">
          {/* <h2 className="heading">Edit Password</h2> */}
          <div class="row">
            <div class="col-25">
              <label className="edit-label" for="password">
                Change Password
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
          <input type="submit" value="Save" className="save-btn" />
          {/* {editPasswordError && (
            <p className="error-message">{editPasswordError}</p>
          )} */}
          <p className="error-message">{editPasswordError}</p>
        </form>
      </section>
    </div>
  );
};

export default EditProfile;
