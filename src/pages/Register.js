import React from "react";
import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import FocusLock from "react-focus-lock";
import { StyledBurger } from "../components/Burger/Burger.styled";
import { StyledMenu } from "../components/Menu/Menu.styled";
import { useOnClickOutside } from "../hooks";
import { useSignUp } from "../auth/useSignUp.js";

const Register = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup } = useSignUp();
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(emailAddress, password);
    navigate("/songs", { replace: true });
  };

  return (
    <div className="register">
      <header className="header">
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
        <strong className="title-logo">Pak's Raps</strong>
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
          <input type="submit" value="Submit" className="submit-btn" />
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default Register;
