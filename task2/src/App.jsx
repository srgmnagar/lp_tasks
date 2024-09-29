import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import './index.css'; // Adjust the path based on your file structure


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} /> {/* Default route */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;


