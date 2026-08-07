import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPatient } from "../api";

function AddPatient() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    doctor: "",
    diagnosis: "",
    appointmentDate: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  // Submit patient form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      // Basic validation
      if (
        !patient.firstName ||
        !patient.lastName ||
        !patient.phone ||
        !patient.email
      ) {
        setError(
          "Please fill all required fields."
        );
        return;
      }
      const token = localStorage.getItem("token")
      await addPatient(patient, token);

      setSuccess(
        "Patient added successfully!"
      );

      // Redirect after saving
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to add patient."
      );
    }
  };


  return (
    <div className="form-container">

      <h1>Add New Patient</h1>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}


      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={patient.firstName}
            onChange={handleChange}
          />


          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={patient.lastName}
            onChange={handleChange}
          />


          <input
            type="number"
            name="age"
            placeholder="Age"
            value={patient.age}
            onChange={handleChange}
          />


          <select
            name="gender"
            value={patient.gender}
            onChange={handleChange}
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={patient.phone}
            onChange={handleChange}
          />


          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={patient.email}
            onChange={handleChange}
          />


          <input
            type="text"
            name="doctor"
            placeholder="Doctor Name"
            value={patient.doctor}
            onChange={handleChange}
          />


          <input
            type="date"
            name="appointmentDate"
            value={patient.appointmentDate}
            onChange={handleChange}
          />

        </div>


        <textarea
          name="address"
          placeholder="Address"
          value={patient.address}
          onChange={handleChange}
        />


        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          value={patient.diagnosis}
          onChange={handleChange}
        />


        <textarea
          name="notes"
          placeholder="Medical Notes"
          value={patient.notes}
          onChange={handleChange}
        />


        <div className="button-group">

          <button
            type="submit"
            className="submit-btn"
          >
            Add Patient
          </button>


          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddPatient;