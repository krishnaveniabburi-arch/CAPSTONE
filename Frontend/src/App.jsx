import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import AddPatient from "./views/AddPatient";
import EditPatient from "./views/EditPatient";
import PatientDetails from "./views/PatientDetails";
import Login from "./views/Login";
import "./App.css";

// protects routes using jwttoken
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isValidToken = token && token !== "undefined" && token !== "null";
  return isValidToken ? children : <Navigate to="/login" replace />;
};


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="container">
          <Routes>
            {/* Root path redirect: automatically pushes localhost:5173 to localhost:5173/login*/}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Dashboard */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

            {/* Add Patient */}
            <Route path="/add-patient" element={<PrivateRoute><AddPatient /></PrivateRoute>} />

            {/* Edit Patient */}
            <Route
              path="/edit-patient/:id"
              element={<PrivateRoute><EditPatient /></PrivateRoute>}
            />

            {/* Patient Details */}
            <Route
              path="/patient/:id"
              element={<PrivateRoute><PatientDetails /></PrivateRoute>}
            />

            {/* Public Route */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route path="*"
              element={<Navigate to="/login" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;




