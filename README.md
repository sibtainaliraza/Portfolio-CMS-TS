# Portfolio CMS - Technical Documentation

A professional portfolio management system built using the MERN stack with a focus on stream-based asset processing and dynamic document delivery.

## Technical Features

### 1. Professional Resume Delivery System
The system implements a redirection layer that serves documents with preserved filenames.
* **Redirection Logic**: The server fetches the stored Cloudinary URL and modifies it to include attachment headers before redirecting the client.
* **Filename Preservation**: Uses the `fl_attachment` parameter to ensure files download as `YourName-CV.pdf` instead of a generated hash.
* **Public Accessibility**: Features a public endpoint that allows recruiters to download the latest resume without requiring authentication.

### 2. Stream-Based Asset Management
The backend is designed to handle file transmissions efficiently without local storage.
* **Memory Processing**: Utilizes Multer memory storage to capture incoming files as buffers.
* **Cloudinary Streaming**: Employs Streamifier to pipe data directly to the cloud storage provider.
* **Secure Admin Controls**: Includes a protected interface for updating system assets and project metadata.

## System Architecture

### Tech Stack
* **Frontend**: React, TypeScript, Tailwind CSS.
* **Backend**: Node.js, Express, TypeScript, Multer.
* **Database**: MongoDB (Mongoose).
* **Cloud Storage**: Cloudinary.

### Environment Configuration
The application requires an `.env` file for secure credential management.
* **MONGODB_URI**: Connection string for the database cluster.
* **CLOUDINARY_API_SECRET**: Secret key for authorized cloud uploads.
* **JWT_SECRET**: Key used for signing administrative session tokens.

## API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/resume/download` | Public | Serves the CV with a professional filename. |
| **POST** | `/api/resume/upload` | Private | Processes file buffers and syncs to the cloud. |
| **GET** | `/api/projects` | Public | Retrieves the curated gallery of projects. |