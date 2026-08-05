import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

               {/* Public Route */}
              <Route 
               path="/login" 
               element={<Login />} 
              />
                <Route path="*" 
                element={<Navigate to="/login" />}
                />
             </Routes>
             </main>
         </div>
         </Router>
  );
}


export default App;        

      
           
                
                  