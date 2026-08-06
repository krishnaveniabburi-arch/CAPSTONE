import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';
import patientRoutes from "./routes/patientroutes.js";
import errorHandler from "./middleware/errorHandler.js";



// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


// Test API route
app.get("/", (req, res) => {

  res.json({
    message:
      "Patient Care Portal API is running"
  });

});
// Patient Routes

app.use(
  "/api/patients",
  patientRoutes
);


// Error handling middleware
// Must be placed after all routes

app.use(errorHandler);

// use production port OR if in development 3000 by default 
const PORT = process.env.PORT || 3000;


// start the server
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});

connectDB();





