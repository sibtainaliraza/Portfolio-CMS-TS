import { Request, Response } from "express";
import About from "../models/about.model.js";

// GET public profile data
export const getAbout = async (req: Request, res: Response) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about || { bio: "", skills: [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE profile data (Admin only)
export const updateAbout = async (req: Request, res: Response) => {
  try {
    const { bio, skills } = req.body;
    // upsert: true creates the document if it doesn't exist
    const updatedAbout = await About.findOneAndUpdate(
      {}, 
      { bio, skills }, 
      { new: true, upsert: true }
    );
    res.status(200).json(updatedAbout);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};