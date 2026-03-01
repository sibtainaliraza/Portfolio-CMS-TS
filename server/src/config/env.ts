import dotenv from "dotenv";
import path from "path";

dotenv.config();

interface Config {
    port:number;
    mongoUri:string;
    nodeEnv:string;
    jwtSecret: string;
}

export const config: Config = {
    port:Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI as string,
    nodeEnv: (process.env.NODE_ENV as string ) || "development",
    jwtSecret: (process.env.JWT_SECRET as string) || "development_secret_key",
};

//Validation

const ValidateConfig = (config:Config): void => {
    if(!config.mongoUri) {
        console.error("Fatal error: mongo_uri is not defined int .env");
        process.exit(1);
    }

    if(!config.jwtSecret || config.jwtSecret === "development_secret_key")
    {
        console.warn("warning: jwt_secret is missing or using default. Not secure !");
    }
};

ValidateConfig(config);
