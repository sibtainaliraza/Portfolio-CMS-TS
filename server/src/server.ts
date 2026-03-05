import app from "./app.js";
import { config } from "./config/env.js";
import connectDB from "./database/connect.js";

const PORT: number = config.port;


const startServer = async () => {
    
    await connectDB();

    app.listen(PORT, (): void => {
        console.log(`🚀 Server is running in ${config.nodeEnv} mode on port ${PORT}`);
    });
};

startServer();