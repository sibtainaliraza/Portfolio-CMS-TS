import { Request, response, Response } from "express";
import Blog from "../models/blog.model.js"
import { error } from "node:console";
import { request } from "node:http";

const createSlug = (title: string) => title.toLowerCase() .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const createBlog = async (req:Request, res:Response): Promise<void> =>{
    try {
        const {title} = req.body;
        const slug = createSlug(title);
        const newBlog = await Blog.create({...req.body, slug});
        res.status(201).json({
            success:true,
            data:newBlog
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(400).json({
                success:false,
                error: error.message
            });
        }
    }
};

export const getAllBlogs = async (req:Request, res: Response): Promise<void> => {
    try {
        const blogs = await Blog.find().sort("-createdAt");
        res.status(200).json({
            success:true,
            count:blogs.length, 
            data:blogs
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(500).json({
                success:false,
                error:error.message
            });
        }
    }
};
                                    

export const getSingleBlog = async (req:Request, res:Response): Promise<void> =>{
    try {
        const blog = await Blog.findOne({slug: req.params.slug});
        if(!blog)
        {
            res.status(404).json({
                sucess:false,
                message:"Blog not found"
            });
        }
        res.status(200).json({
            sucess: true,
            data:blog
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(500).json({
                success:false,
                error:error.message
            });
        }
    }
};


export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        if(req.body.title)
            req.body.slug = createSlug(req.body.title);
        const blog = await Blog.findOneAndUpdate({slug:req.params.slug}, req.body, {new:true, runValidators: true});
        res.status(200).json({
            success:true,
            data:blog
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(400).json({
                success:false,
                error:error.message
            });
        }
    }
};
                                    

export const deleteBlog = async (req:Request, res: Response): Promise<void>=>{
    try {
        await Blog.findOneAndDelete({slug: req.params.slug});
        res.status(200).json({
            success: true,
            message:"Blog deleted"
        });
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({
                success: false,
                error: error.message
            });
    }
};