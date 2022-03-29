import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Songs from "./pages/Songs";

function App() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home isEnabled={isEnabled} />}></Route>
          <Route
            path="/register"
            element={<Register isEnabled={isEnabled} />}
          ></Route>
          <Route
            path="/login"
            element={<Login isEnabled={isEnabled} />}
          ></Route>
          <Route
            path="/songs"
            element={<Songs isEnabled={isEnabled} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
