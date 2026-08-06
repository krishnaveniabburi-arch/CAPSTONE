import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany();

        await User.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin",
        });

        console.log("Admin user created");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedAdmin();