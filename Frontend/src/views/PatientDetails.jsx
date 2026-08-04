import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../api";

function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch patient details from API
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientById(id);
        setPatient(data);

      } catch (err) {
        console.error(err);

        setError(
          "Unable to load patient details."
        );

      } finally {
        setLoading(false);
      }
    };


    fetchPatient();

  }, [id]);



  if (loading) {
    return (
      <h2>
        Loading patient information...
      </h2>
    );
  }



  if (error) {
    return (
      <h2 className="error-message">
        {error}
      </h2>
    );
  }



  if (!patient) {
    return (
      <h2>
        Patient not found.
      </h2>
    );
  }



  return (

    <div className="patient-details">


      <div className="details-header">

        <h1>
          Patient Details
        </h1>


        <button
          className="edit-btn"
          onClick={() =>
            navigate(`/edit-patient/${patient._id}`)
          }
        >
          Edit Patient
        </button>

      </div>



      <div className="patient-card">


        <div className="detail-row">
          <strong>Name:</strong>

          <span>
            {patient.firstName} {patient.lastName}
          </span>
        </div>



        <div className="detail-row">
          <strong>Age:</strong>

          <span>
            {patient.age}
          </span>
        </div>



        <div className="detail-row">
          <strong>Gender:</strong>

          <span>
            {patient.gender}
          </span>
        </div>



        <div className="detail-row">
          <strong>Phone:</strong>

          <span>
            {patient.phone}
          </span>
        </div>



        <div className="detail-row">
          <strong>Email:</strong>

          <span>
            {patient.email}
          </span>
        </div>



        <div className="detail-row">
          <strong>Address:</strong>

          <span>
            {patient.address}
          </span>
        </div>



        <div className="detail-row">
          <strong>Doctor:</strong>

          <span>
            {patient.doctor}
          </span>
        </div>



        <div className="detail-row">
          <strong>Diagnosis:</strong>

          <span>
            {patient.diagnosis}
          </span>
        </div>



        <div className="detail-row">
          <strong>
            Appointment Date:
          </strong>

          <span>
            {
              patient.appointmentDate
                ? new Date(
                    patient.appointmentDate
                  ).toLocaleDateString()
                : "Not scheduled"
            }
          </span>

        </div>



        <div className="detail-row">

          <strong>
            Medical Notes:
          </strong>


          <span>
            {patient.notes || "No notes available"}
          </span>

        </div>


      </div>



      <button
        className="cancel-btn"
        onClick={() => navigate("/")}
      >
        Back to Dashboard
      </button>


    </div>

  );

}


export default PatientDetails;