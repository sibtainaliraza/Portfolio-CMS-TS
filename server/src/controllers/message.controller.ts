import { Request, Response } from "express";
import Message from "../models/message.model.js";

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;

        // Manual validation for faster response
        if (!name || !email || !message) {
            res.status(400).json({
                success: false,
                error: "All fields (name, email, message) are required"
            });
            return;
        }

        const newMessage = await Message.create({ name, email, message });
        
        res.status(201).json({
            success: true,
            message: "Message secured successfully",
            data: newMessage
        });

    } catch (error) {
        if (error instanceof Error) {
            // Returns the exact Mongoose error (e.g., "Message must be at least 10 characters")
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetches for your Admin Inbox
        const messages = await Message.find().sort("-createdAt");
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};