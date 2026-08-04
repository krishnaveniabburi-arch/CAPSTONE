// src/views/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients, deletePatient } from "../api";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load patients from the backend
  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load patient records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Search patients by name or doctor
  useEffect(() => {
    const filtered = patients.filter((patient) => {
      const fullName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        (patient.doctor || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredPatients(filtered);
  }, [search, patients]);

  // Delete patient
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      loadPatients();
    } catch (err) {
      console.error(err);
      alert("Unable to delete patient.");
    }
  };

  if (loading) {
    return <h2>Loading patients...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Patient Dashboard</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/add-patient")}
        >
          + Add Patient
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by patient name or doctor..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredPatients.length === 0 ? (
        <p>No patient records found.</p>
      ) : (
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>
                  {patient.firstName} {patient.lastName}
                </td>

                <td>{patient.age}</td>

                <td>{patient.gender}</td>

                <td>{patient.doctor}</td>

                <td>{patient.diagnosis}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/patient/${patient._id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/edit-patient/${patient._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(patient._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;