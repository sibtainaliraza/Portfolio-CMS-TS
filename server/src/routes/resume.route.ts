import { Router } from "express";
import { updateResume } from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

 router.put("/",protect, updateResume);

 export default router;
