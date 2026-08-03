import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';
import mongoose from 'mongoose';

import patientroutes from './routes/patientroutes.js';
import errorHandler  from './middleware/errorHandler.js';

const app = express();

// use production port OR if in development 3000 by default 
const port = process.env.PORT || 3000;

// allow requests from frontend
app.use(cors());

// format incoming data to json
app.use(express.json());



// start the server
app.listen(port, () => {
    console.log('Listening on port: ', port);
    connectDB();
})

export default errorHandler;


