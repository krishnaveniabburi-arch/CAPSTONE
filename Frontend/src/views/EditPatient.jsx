// src/views/EditPatient.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../api";

function EditPatient() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // Load existing patient details
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientById(id);

        setPatient({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
          doctor: data.doctor || "",
          diagnosis: data.diagnosis || "",
          appointmentDate:
            data.appointmentDate
              ? data.appointmentDate.substring(0, 10)
              : "",
          notes: data.notes || "",
        });

      } catch (err) {
        console.error(err);
        setError(
          "Unable to load patient information."
        );
      } finally {
        setLoading(false);
      }
    };


    fetchPatient();

  }, [id]);


  // Handle form input changes
  const handleChange = (e) => {

    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });

  };


  // Update patient
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError("");
      setSuccess("");

      await updatePatient(id, patient);

      setSuccess(
        "Patient updated successfully!"
      );


      setTimeout(() => {
        navigate(`/patient/${id}`);
      }, 1500);


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to update patient."
      );

    }

  };


  if (loading) {
    return <h2>Loading patient details...</h2>;
  }


  return (

    <div className="form-container">

      <h1>Edit Patient</h1>


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
            placeholder="First Name"
            value={patient.firstName}
            onChange={handleChange}
          />


          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
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
            placeholder="Phone Number"
            value={patient.phone}
            onChange={handleChange}
          />



          <input
            type="email"
            name="email"
            placeholder="Email"
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
            Update Patient
          </button>



          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate(`/patient/${id}`)
            }
          >
            Cancel
          </button>


        </div>


      </form>


    </div>

  );

}


export default EditPatient;