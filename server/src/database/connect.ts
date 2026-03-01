import mongoose, { ConnectOptions, Mongoose} from "mongoose";
import { config } from "../config/env.js";

const connectDB = async (): Promise<void> => {
    try {
        console.log("Attempting to connect to MongoDB");

        const options: ConnectOptions = {
            autoIndex: true,
        };

        const conn: Mongoose = await mongoose.connect(config.mongoUri!,options);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error:unknown) {
        if(error instanceof Error ) {
            console.error("Database connection error");
            console.error(`Reason ${error.message}`);
        }
        process.exit(1);
    }
};

export default connectDB;