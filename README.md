# Portfolio CMS - Technical Documentation

A high-performance, professional portfolio management engine built with the **MERN** stack, designed with a focus on **Low-Level Design (LLD)** principles and stream-based asset processing.

## Technical Overview
This project serves as a centralized content management system (CMS) for a developer's professional brand. It moves away from static asset hosting in favor of a dynamic, cloud-integrated delivery system.

---

## Technical Features & Implementation Details

### 1. Professional Resume Redirection Service
To solve the issue of cloud providers generating random, non-professional filenames (e.g., `qq39qapy...`), I implemented a server-side redirection layer.
* **Logic**: Instead of linking directly to Cloudinary, the frontend calls a public Express endpoint.
* **Dynamic Injection**: The backend fetches the stored URL from MongoDB and injects the `fl_attachment` parameter into the string.
* **Result**: This forces the browser to initiate a download with a professional, predefined name (e.g., `Aman-CV.pdf`), improving recruiter experience.

### 2. Zero-Disk Buffer Streaming
The system is architected to be "stateless" regarding file storage to ensure compatibility with modern cloud hosting like Render or Vercel.
* **Memory Management**: Multer is configured with `memoryStorage()`, which keeps incoming file data in a RAM buffer rather than writing to a temporary local folder.
* **Streamifier Integration**: To transfer this buffer to Cloudinary, I implemented a streaming utility that pipes the buffer directly into the Cloudinary Upload API.
* **Performance**: This reduces Disk I/O overhead and increases security by ensuring sensitive documents never touch the server's local file system.

### 3. Secure Admin Infrastructure
* **JWT-Based Authentication**: The system uses JSON Web Tokens to protect management routes.
* **Custom Middleware**: A `protect` middleware intercepts requests to verify tokens before allowing access to the `System Settings` or `Manage Projects` components.
* **Data Integrity**: Uses MongoDB `upsert` (update-or-insert) logic to ensure that a single master CV record is maintained without duplicates.

---

## System Architecture

### Frontend Layer
* **React (Vite)**: For high-speed development and optimized build performance.
* **TypeScript**: Enforces strict typing across all components to prevent runtime data mismatches.
* **Tailwind CSS**: A "glassmorphism" UI design chosen for a modern, technical aesthetic.

### Backend Layer
* **Node.js & Express**: Handling the REST API architecture.
* **Multer**: Configured for memory-resident file handling.
* **Mongoose**: Providing a schema-based solution for MongoDB data modeling.

### Infrastructure
* **MongoDB Atlas**: Managed cloud database.
* **Cloudinary**: External CDN and asset storage cluster.

---

## API Reference

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/resume/download` | Triggers a professional, renamed download of the CV. |
| **GET** | `/api/projects` | Retrieves the curated project list for the public gallery. |

### Protected Admin Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/resume/upload` | Processes file buffer and synchronizes with Cloudinary and MongoDB. |
| **PUT** | `/api/projects/:id` | Updates specific project metadata and visibility settings. |

---

## Environment Configuration
To run this project locally, create an `.env` file in the server root:
```env
PORT=8000
MONGODB_URI=your_mongodb_cluster_link
JWT_SECRET=your_secure_random_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

