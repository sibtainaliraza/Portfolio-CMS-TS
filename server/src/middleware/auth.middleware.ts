import { Request , Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";

interface decodedToken {
    i: string;
    iat:number;
    exp: number;
}

export const protect = async (req:Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token: string | undefined;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token)
        {
            res.status(401).json({
                success:false,
                message:"Not authorized to access this route"
            });
            return;
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as decodedToken;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"Token is invalid or expired"
        });
    }
};