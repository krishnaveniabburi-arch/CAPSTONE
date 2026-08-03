async function connectDB() {
    try {import mongoose from "mongoose";


        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB')
    } catch(e) {
        console.log(e);
    }
}

export default connectDB;

