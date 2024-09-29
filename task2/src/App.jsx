import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import './index.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} /> 
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;


