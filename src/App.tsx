import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ImageUpload from "./ImageUplaoad";

function App() {
  useEffect(() => {
    fetch("http://localhost:8082/api/v1/device/all")
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
          <img src="src/assets/pfp.png"></img>
        </div>
      </nav>
       <div className="image-upload">
        <ImageUpload />
       </div>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
