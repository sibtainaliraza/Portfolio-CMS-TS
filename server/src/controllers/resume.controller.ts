import { Request, Response } from "express";
import Resume from "../models/resume.model.js";
import { uploadCloudinary } from "../utils/uploadToCloudinary.js";

/**
 * PUBLIC: Serves the resume with a custom professional filename
 * GET /api/resume/download
 */
export const getResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const resumeData = await Resume.findOne().sort("-createdAt");

    if (!resumeData || !resumeData.fileUrl) {
      res.status(404).json({
        success: false,
        message: "Resume transmission not found in the system core."
      });
      return;
    }

    // --- FILENAME FIX ---
    // Define your professional filename (e.g., Aman-CV.pdf)
    const professionalName = "SIBTAIN ALI RAZA-CV"; 
    
    // Cloudinary uses 'fl_attachment:filename' to force a specific download name
    // We inject this into the URL string after '/upload/' or '/raw/upload/'
    let downloadUrl = resumeData.fileUrl;
    
    if (downloadUrl.includes("/upload/")) {
      downloadUrl = downloadUrl.replace(
        "/upload/", 
        `/upload/fl_attachment:${professionalName}/`
      );
    }

    // Redirecting to this modified URL triggers a renamed download
    res.redirect(downloadUrl);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ADMIN: Processes the file buffer and syncs with Cloudinary & MongoDB
 * POST /api/resume/upload
 */
export const handleResumeUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?._id;

    if (!req.file) {
      res.status(400).json({ success: false, message: "No file detected in transmission." });
      return;
    }

    const isDoc = req.file.mimetype === "application/pdf";

    // 1. Upload to Cloudinary
    const cloudinaryResult = await uploadCloudinary(req.file.buffer, "resume", isDoc);

    // 2. Save Secure URL to MongoDB
    const updatedResume = await Resume.findOneAndUpdate(
      { user: userId },
      { 
        $set: { 
          fileUrl: cloudinaryResult.secure_url, 
          fileType: isDoc ? 'pdf' : 'other' 
        } 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "CV Core Synchronized Successfully",
      data: updatedResume
    });
  } catch (error: any) {
    console.error("Sync error:", error);
    res.status(500).json({ success: false, message: "File upload failed" });
  }
};