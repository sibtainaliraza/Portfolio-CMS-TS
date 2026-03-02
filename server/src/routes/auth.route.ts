import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router:Router =Router();

router.post("/register",register);
router.post("/login",login);

export default router;