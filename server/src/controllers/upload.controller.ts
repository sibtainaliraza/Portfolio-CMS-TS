import { Request, Response } from "express";
import { uploadCloudinary } from "../utils/uploadToCloudinary.js";


export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if(!req.file)
        {
            res.status(400).json({
                success:false,
                message:"No file provided"
            });
            return;
        }
        const isDoc = req.file.mimetype === "application/pdf" || req.file?.mimetype.includes("wordprocessingml");

        const folder = isDoc ? "resume" : "images";

        const result = await uploadCloudinary(req.file.buffer, folder, isDoc);

        res.status(200).json({
            success:true,
            message:"File uploaded successfully",
            url: result.secure_url,
            format: result.format
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message:"File upload failed"
        });
    }
};
