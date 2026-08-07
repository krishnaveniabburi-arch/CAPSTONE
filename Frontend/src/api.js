const BASE_URL = "http://localhost:3000/api";

// Get JWT token from localStorage
const getToken = () => localStorage.getItem("token");

// Common API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
// creating base headers object
  const headers = {
      "Content-Type": "application/json",
       ...options.headers,
    };
    if(token) {
      headers [ "Authorization"] = `Bearer ${token}`;
    }
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
   headers: headers,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// Get all patients
export const getPatients = () => apiRequest("/patients");

// Get patient by ID
export const getPatientById = (id) =>
  apiRequest(`/patients/${id}`);

// Add patient
export const addPatient = (patientData) =>
  apiRequest("/patients", {
    method: "POST",
    body: JSON.stringify(patientData),
  });

// Update patient
export const updatePatient = (id, patientData) =>
  apiRequest(`/patients/${id}`, {
    method: "PUT",
    body: JSON.stringify(patientData),
  });

// Delete patient
export const deletePatient = (id) =>
  apiRequest(`/patients/${id}`, {
    method: "DELETE",
  });

// Login
export const login = async (email, password) => {
  const data = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Save JWT token
  localStorage.setItem("token", data.token);

  return data;
};

// Register
export const register = (userData) =>
  apiRequest("/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

// Logout
export const logout = () => {
  localStorage.removeItem("token");
}