import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
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
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
