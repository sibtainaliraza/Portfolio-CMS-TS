import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  bio: string;
  skills: string[];
}

const AboutSchema: Schema = new Schema({
  bio: { type: String, required: true },
  skills: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.model<IAbout>("About", AboutSchema);