import { Router } from "express";
import multer from "multer";
import { handleResumeUpload, getResume } from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router: Router = Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } 
});

// PUBLIC: Fixing the filename during download
router.get("/download", getResume);

// PROTECTED: Admin upload
router.post("/upload", protect, upload.single("resume"), handleResumeUpload);

export default router;