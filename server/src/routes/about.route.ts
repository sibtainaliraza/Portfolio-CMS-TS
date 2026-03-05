import express from "express";
import { getAbout, updateAbout } from "../controllers/about.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", protect, updateAbout); 

export default router;