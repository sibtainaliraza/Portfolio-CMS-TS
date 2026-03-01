import { Request, Response } from "express";
import Message from "../models/message.model.js";

export const sendMessage = async (req:Request, res: Response):Promise<void> => {
    try {
        const newMessage = await Message.create(req.body);
        res.status(201).json({
            sucess:true,
            message:"Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        if(error instanceof Error)
        {
            res.status(400).json ({
                sucess:false,
                error:error.message
            });
        }
    }
};


export const getMessages = async (req:Request, res: Response): Promise <void> => {
    try {
        const messages = await Message.find().sort("-createdAt");
        res.status(200).json({
            sucess:true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(500).json({
                sucess:false,
                error: error.message
            });
        }
    }
};