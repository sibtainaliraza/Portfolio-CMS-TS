import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import projectRoutes from "./routes/project.route.js"
import messageRoutes from "./routes/message.route.js"
import blogRoutes from "./routes/blog.route.js"
import authRoutes from "./routes/auth.route.js"
import uploadRoutes from "./routes/upload.route.js"
import resumeRoutes from "./routes/resume.route.js"

// Initialize Express
const app: Application = express();

// Security & Parsing Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes
app.get('/health', (req: Request, res: Response): void => {
    const statusCode: number = 200;
    res.status(statusCode).json({
        status: "active",
        message: "Server is running perfectly"
    });
});

// We will add your projectRoutes here next!
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/blogs", blogRoutes)
app.use("/api/auth",authRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/resume", resumeRoutes);

// Export the configured app (DO NOT CALL app.listen HERE)
export default app;