// server/src/routes/upload.route.ts
import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../controllers/upload.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadFile); // Key MUST be "file" to match FormData.append("file", file)

export default router;