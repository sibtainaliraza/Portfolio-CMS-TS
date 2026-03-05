import { Request, Response } from "express";
import Project from "../models/project.model.js";

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectData = req.body;
    const newProject = await Project.create(projectData);

    res.status(201).json({
      success: true, // Fixed spelling
      message: "Project created successfully!",
      data: newProject,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false, // Fixed spelling
        message: "Failed to create project",
        error: error.message,
      });
    }
  }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({}).sort("-createdAt"); // Sorting by newest first

    res.status(200).json({
      success: true, // Fixed spelling
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
        error: error.message,
      });
    }
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    // Avoid naming the variable the same as the function
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      res.status(404).json({
        success: false, // Fixed spelling
        message: "Project not found",
      });
      return;
    }
    res.status(200).json({
      success: true, // Fixed spelling
      message: "Project updated successfully!",
      data: updatedProject, // Fixed 'date' to 'data'
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false, // Fixed spelling
        message: "Failed to update project",
        error: error.message,
      });
    }
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true, // Fixed spelling
      message: "Project deleted successfully!",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false, // Fixed spelling
        message: "Failed to delete project",
        error: error.message,
      });
    }
  }
};