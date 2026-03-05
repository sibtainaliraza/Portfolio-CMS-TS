import mongoose from "mongoose";
import User from "../server/src/models/user.model.js"; 
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    
    // Clear the old failed user first
    await User.deleteOne({ email: "admin@example.com" });

    const admin = new User({
      email: "sibtain@example.com",
      password: "Iwillconquer123", // The pre-save hook in your model will hash this
    });

    await admin.save();
    console.log("Admin user saved to MongoDB! The pre-save hook has hashed your password.");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();