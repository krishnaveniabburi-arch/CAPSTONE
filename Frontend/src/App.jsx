import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import AddPatient from "./views/AddPatient";
import EditPatient from "./views/EditPatient";
import PatientDetails from "./views/PatientDetails";
import "./App.css";

// protects routes using jwttoken

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="container">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Add Patient */}
            <Route path="/add-patient" element={<AddPatient />} />

            {/* Edit Patient */}
            <Route
              path="/edit-patient/:id"
              element={<EditPatient />}
            />

            {/* Patient Details */}
            <Route
              path="/patient/:id"
              element={<PatientDetails />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;        

      
           
                
                  