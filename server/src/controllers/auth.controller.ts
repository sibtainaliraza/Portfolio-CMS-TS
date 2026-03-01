import { Request, Response } from "express";
import User  from "../models/user.model.js";
import  Jwt  from "jsonwebtoken";

// TEMPORARY: Change 'login' to 'register' just to create the user once
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password }); // This triggers the pre-save hash!
        await user.save();
        res.status(201).json({ success: true, message: "Admin Created!" });
    } catch (error) {
        res.status(500).json({ success: false });
    }
};

export const login = async (req:Request, res: Response): Promise<void> => {
    try {
        const {email, password} =  req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user || !(await user.comparePassword(password)))
        {
            res.status(401).json({
                success:false,
                message:"Invalid email or password"
            });
            return;
        }

        const token = Jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET || "fallback_secret",
            {expiresIn: "1d"}
        );

        res.status(200).json({
            success:true, token});
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({
                success:false,
                error: error.message 
            });
    }
};