
// Patient database schema for Patient Care Portal

import mongoose from "mongoose";


const patientSchema = new mongoose.Schema(

  {

    // Basic Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },


    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },


    age: {
      type: Number,
      required: [true, "Age is required"],
      min: 0,
      max: 120
    },


    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: [
        "Male",
        "Female",
        "Other"
      ]
    },


    // Contact Information
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true
    },


    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },


    address: {
      type: String,
      required: true,
      trim: true
    },


    // Medical Information
    doctor: {
      type: String,
      required: [
        true,
        "Doctor name is required"
      ],
      trim: true
    },


    diagnosis: {
      type: String,
      required: [
        true,
        "Diagnosis is required"
      ],
      trim: true
    },


    appointmentDate: {
      type: Date
    },


    notes: {
      type: String,
      maxlength: 500,
      trim: true
    },


    // Optional user reference
    // Connects patient records to logged-in users
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },

  {
    timestamps: true
  }

);


// Database indexes for faster searching

patientSchema.index({
  firstName: 1,
  lastName: 1
});


patientSchema.index({
  doctor: 1
});

// Export Patient model

const Patient = mongoose.model(
  "Patient",
  patientSchema
);


export default Patient;