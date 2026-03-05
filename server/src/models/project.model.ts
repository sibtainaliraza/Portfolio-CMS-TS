import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
    title:string;
    description:string;
    techStack: string[];
    githubUrl:string;
    liveUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}


const projectSchema: Schema<IProject> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Project description is required"],
        },
        techStack: {
            type: [String],
            default: [] 
        },
        githubUrl: {
            type: String,
            default: "" 
        },
        liveUrl: {      
            type: String,
            default: ""
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model<IProject> ("Project", projectSchema);

export default Project;