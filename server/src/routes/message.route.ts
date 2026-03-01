import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router: Router = Router();

router.route("/")
    .post(sendMessage)
    .get(protect, getMessages);

export default router;