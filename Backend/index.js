import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import connectDB from './db.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// use production port OR if in development 3000 by default 
const PORT = process.env.PORT || 3000;

// allow requests from frontend
app.use(cors());

// format incoming data to json
app.use(express.json());

// start the server
app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
});

connectDB();





