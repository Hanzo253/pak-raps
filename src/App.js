import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import Login from "./pages/Login";
import Songs from "./pages/Songs";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/emailverification"
            element={<EmailVerification />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/passwordreset" element={<PasswordReset />}></Route>
          <Route path="/songs" element={<Songs />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
