import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router: Router = Router();

router.route("/")
    .post(sendMessage)
    .get(getMessages);

export default router;