import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Main from "./Components/Main";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./Components/AuthProvider";
import './index.css'; 

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<SignUp />} /> 
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    } />
    </Routes>
    </AuthProvider>
  );
}

export default App;


