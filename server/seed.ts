import mongoose from "mongoose";
import user from "../server/src/models/user.model.js"; // Adjust this path if needed
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    // 1. Connect to your Production Database
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB for seeding...");

    // 2. Check if admin already exists
    const adminExists = await user.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists in the system core.");
      process.exit();
    }

    // 3. Create the Admin User
    const admin = new user({
      name: "Portfolio Admin",
      email: "sibtain@example.com", 
      password: "Iwillconquer123", // Ensure your User model hashes this!
      role: "admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();