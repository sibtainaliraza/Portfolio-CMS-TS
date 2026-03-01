import app from "./app.js";
import { config } from "./config/env.js";
import connectDB from "./database/connect.js";

const PORT: number = config.port;

// Initialize the database, THEN start the server
const startServer = async () => {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Start listening for web traffic
    app.listen(PORT, (): void => {
        console.log(`🚀 Server is running in ${config.nodeEnv} mode on port ${PORT}`);
    });
};

startServer();