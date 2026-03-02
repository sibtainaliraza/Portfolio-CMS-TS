import { Request, Response } from "express";
import Resume from "../models/resume.model.js";

export const updateResume = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?._id;

        const {resumeUrl, fileType} = req.body;
        
        if(!resumeUrl)
        {
            res.status(400).json({
                success:false,
                message: "resumeUrl is required"
            });
            return;
        }
        const updateResume = await Resume.findOneAndUpdate(
        {user:userId},
        {
            $set:{fileUrl:resumeUrl, 
                fileType:fileType || 'pdf'
            }
        },
        {new:true, upsert:true}
    );
        res.status(200).json({
            success:true,
            message:"Resume saved to database successfully",
            user: updateResume
        });
    } catch (error) {
        console.error("Update profile error:",error);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};