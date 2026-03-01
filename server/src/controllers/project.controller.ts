import { Request, Response } from "express";
import Project from "../models/project.model.js";

export const createProject = async (req:Request, res:Response): Promise<void> => {
    try {
        const projectData = req.body;
        const newProject = await Project.create(projectData);

        res.status(201).json({
            suceess:true,
            message:"Project created successfully !",
            data: newProject,
        });

    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({
                sucess:false,
                message: "Failed to create project",
                error: error.message
            });
        }
    }
};

export const getProjects = async (req:Request, res: Response): Promise<void> =>{
    try {
        const projects = await Project.find({});

        res.status(200).json({
            sucess:true,
            count:projects.length,
            data:projects,
        });

    } catch (error) {
        if(error instanceof Error)
        {
            res.status(500).json({
                success:false,
                mmessage:"Failed to fetch projects",
                error:error.message,
            });
        }
    }
};

export const updateProject = async(req:Request, res: Response): Promise<void> =>{
    try {
        const updateProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!updateProject)
        {
            res.status(404).json({
                sucess:false,
                message:"Project not found"
            });
            return;
        }
        res.status(200).json({
            sucess:true,
            message: "Project updated successfully !",
            date:updateProject,
        });
    } catch (error) {
        if(error instanceof Error)
        {
            res.status(400).json({
                sucess:false,
                message:"Faild to update project",
                error: error.message
            });
        }
    }
};

export const deleteProject = async (req:Request, res: Response): Promise<void> =>{
    try {
        const deleteProject = await Project.findByIdAndDelete(req.params.id);

        if(!deleteProject)
        {
            res.status(404).json({
                success:false,
                message:"Project not found"
            });
            return;
        }

        res.status(200).json({
            sucess:true,
            message:"Project deleted successfully !"
        });
        
    } catch (error) {
        if( error instanceof Error)
        {
            res.status(400).json({
                sucess:false,message:"Failed to delete project",
                error:error.message
            });
        }
    }
};