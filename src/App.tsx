import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/device/all")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="menu-bar">
        <Link to="/">
          <span>Cat Tracker</span>
        </Link>
        <div className="profile-img">
          <span>Imagem</span>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
