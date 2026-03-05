import cloudinary from "../config/cloudinary.js";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

export const uploadCloudinary = (
  fileBuffer: Buffer, 
  folder: string, 
  isDocument: boolean = false
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${folder}`,
        resource_type: isDocument ? "raw" : "auto",
        use_filename: true,
        unique_filename: false,
        overwrite: true
      },
      (error, result) => {
        if (error) return reject(error);
        if (result) resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};