import dotenv from "dotenv";
import mongoose from "mongoose";

import Patient from "./models/Patient.js";

dotenv.config();


const patients = [

  {
    firstName: "John",
    lastName: "Smith",
    age: 45,
    gender: "Male",
    phone: "5551234567",
    email: "jhon@email.com"
    address: "New Brunswick NJ",
    doctor: "Sarah Brown",
    diagnosis: "Diabetes",
    notes: "Regular checkup"
  },


  {
    firstName: "Mary",
    lastName: "Johnson",
    age: 32,
    gender: "Female",
    phone: "5559876543",
    email: "mary@email.com",
    address: "Edison NJ",
    doctor: "Michael Lee",
    diagnosis: "Asthma",
    notes: "Follow-up required"
  }

];


const seedDatabase = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );


    await Patient.deleteMany();


    await Patient.insertMany(
      patients
    );


    console.log(
      "Sample patients added"
    );


    process.exit();


  } catch(error) {

    console.log(error.message);

    process.exit(1);

  }

};


seedDatabase();